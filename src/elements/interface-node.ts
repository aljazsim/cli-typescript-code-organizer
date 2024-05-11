import * as ts from "typescript";
import { AccessorNode } from "./accessor-node";
import { ElementNode } from "./element-node";
import { GetterNode } from "./getter-node";
import { IndexSignatureNode } from "./index-signature-node";
import { MethodSignatureNode } from "./method-signature-node";
import { PropertySignatureNode } from "./property-signature-node";
import { SetterNode } from "./setter-node";
import { InterfaceMemberGroupConfiguration } from "../configuration/interface-member-group-configuration";
import { ElementNodeGroup } from "./element-node-group";
import { InterfaceMemberType } from "../enums/interface-member-type";
import { groupByPlaceAboveBelow } from "../helpers/node-helper";

export class InterfaceNode extends ElementNode
{
    // #region Properties (7)

    public readonly getters: GetterNode[] = [];
    public readonly indexes: IndexSignatureNode[] = [];
    public readonly membersEnd: number = 0;
    public readonly membersStart: number = 0;
    public readonly methods: MethodSignatureNode[] = [];
    public readonly properties: PropertySignatureNode[] = [];
    public readonly setters: SetterNode[] = [];

    // #endregion Properties (7)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, interfaceDeclaration: ts.InterfaceDeclaration)
    {
        super(sourceFile, interfaceDeclaration);

        this._name = (<ts.Identifier>interfaceDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(interfaceDeclaration.name.pos, interfaceDeclaration.name.end).trim();

        this._fullStart = interfaceDeclaration.getFullStart();
        this._end = interfaceDeclaration.getEnd();
        this._start = interfaceDeclaration.getStart(sourceFile, false);

        if (interfaceDeclaration.members && interfaceDeclaration.members.length > 0)
        {
            this.membersStart = interfaceDeclaration.members[0].getFullStart();
            this.membersEnd = interfaceDeclaration.members[interfaceDeclaration.members.length - 1].getEnd();
        }

        // members
        for (let member of interfaceDeclaration.members)
        {
            if (ts.isPropertySignature(member))
            {
                this.properties.push(new PropertySignatureNode(sourceFile, member));
            }
            else if (ts.isGetAccessorDeclaration(member))
            {
                this.getters.push(new GetterNode(sourceFile, member));
            }
            else if (ts.isSetAccessorDeclaration(member))
            {
                this.setters.push(new SetterNode(sourceFile, member));
            }
            else if (ts.isIndexSignatureDeclaration(member))
            {
                this.indexes.push(new IndexSignatureNode(sourceFile, member));
            }
            else if (ts.isMethodSignature(member))
            {
                this.methods.push(new MethodSignatureNode(sourceFile, member));
            }
        }
    }

    // #endregion Constructors (1)

    // #region Public Methods (7)

    public getGettersAndSetters()
    {
        return this.getters.concat(this.setters);
    }

    public getIndexes()
    {
        return this.indexes;
    }

    public getMethods()
    {
        return this.methods;
    }

    public getProperties()
    {
        return this.properties.filter((x) => this.isWritable(x));
    }

    public getReadOnlyProperties()
    {
        return this.properties.filter((x) => this.isReadOnly(x));
    }

    public organizeMembers(memberTypeOrder: InterfaceMemberGroupConfiguration[])
    {
        let regions: ElementNodeGroup[] = [];

        for (const memberTypeGroup of memberTypeOrder)
        {
            const placeAbove = memberTypeGroup.placeAbove;
            const placeBelow = memberTypeGroup.placeBelow;
            const memberGroups: ElementNodeGroup[] = [];

            for (const memberType of memberTypeGroup.memberTypes)
            {
                if (memberType === InterfaceMemberType.properties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProperties(), placeAbove, placeBelow, false), false));
                }
                else if (memberType === InterfaceMemberType.indexes)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getIndexes(), placeAbove, placeBelow, false), false));
                }
                if (memberType === InterfaceMemberType.gettersAndSetters)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getGettersAndSetters(), placeAbove, placeBelow, false), false));
                }
                else if (memberType === InterfaceMemberType.methods)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getMethods(), placeAbove, placeBelow, false), false));
                }
            }

            if (memberGroups.length > 0)
            {
                regions.push(new ElementNodeGroup(memberTypeGroup.caption, memberGroups, [], true));
            }
        }

        return regions;
    }

    // #endregion Public Methods (7)
}
