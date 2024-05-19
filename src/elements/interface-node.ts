import * as ts from "typescript";
import { ElementNode } from "./element-node";
import { GetterNode } from "./getter-node";
import { IndexSignatureNode } from "./index-signature-node";
import { MethodSignatureNode } from "./method-signature-node";
import { PropertySignatureNode } from "./property-signature-node";
import { SetterNode } from "./setter-node";
import { InterfaceMemberGroupConfiguration } from "../configuration/interface-member-group-configuration";
import { ElementNodeGroup } from "./element-node-group";
import { InterfaceMemberType } from "../enums/interface-member-type";
import { groupByPlaceAboveBelow, isReadOnly, isWritable } from "../helpers/node-helper";
import { InterfaceConfiguration } from "../configuration/interface-configuration";
import { config } from "process";

export class InterfaceNode extends ElementNode
{
    // #region Properties (8)

    public readonly getters: GetterNode[] = [];
    public readonly indexes: IndexSignatureNode[] = [];
    public readonly membersEnd: number = 0;
    public readonly membersStart: number = 0;
    public readonly methods: (MethodSignatureNode | PropertySignatureNode)[] = [];
    public readonly name: string;
    public readonly properties: PropertySignatureNode[] = [];
    public readonly setters: SetterNode[] = [];

    // #endregion Properties (8)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, interfaceDeclaration: ts.InterfaceDeclaration, treatArrowFunctionPropertiesAsMethods: boolean)
    {
        super(sourceFile, interfaceDeclaration);

        this.name = (<ts.Identifier>interfaceDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(interfaceDeclaration.name.pos, interfaceDeclaration.name.end).trim();

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
                const propertySignature = member as ts.PropertySignature;

                if (treatArrowFunctionPropertiesAsMethods && propertySignature.type?.kind === ts.SyntaxKind.FunctionType)
                {
                    this.methods.push(new PropertySignatureNode(sourceFile, member));
                }
                else
                {
                    this.properties.push(new PropertySignatureNode(sourceFile, member));
                }
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

    // #region Public Methods (6)

    private getGettersAndSetters()
    {
        return this.getters.concat(this.setters);
    }

    private getIndexes()
    {
        return this.indexes;
    }

    private getMethods()
    {
        return this.methods;
    }

    private getProperties()
    {
        return this.properties.filter((x) => isWritable(x));
    }

    private getReadOnlyProperties()
    {
        return this.properties.filter((x) => isReadOnly(x));
    }

    public organizeMembers(configuration: InterfaceConfiguration)
    {
        let regions: ElementNodeGroup[] = [];

        for (const memberGroup of configuration.memberGroups)
        {
            const placeAbove = memberGroup.placeAbove;
            const placeBelow = memberGroup.placeBelow;
            const memberGroups: ElementNodeGroup[] = [];

            for (const memberType of memberGroup.memberTypes)
            {
                if (memberType === InterfaceMemberType.properties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProperties(), placeAbove, placeBelow, false), false, null));
                }
                else if (memberType === InterfaceMemberType.readOnlyProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProperties(), placeAbove, placeBelow, false), false, null));
                }
                else if (memberType === InterfaceMemberType.indexes)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getIndexes(), placeAbove, placeBelow, false), false, null));
                }
                if (memberType === InterfaceMemberType.gettersAndSetters)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getGettersAndSetters(), placeAbove, placeBelow, false), false, null));
                }
                else if (memberType === InterfaceMemberType.methods)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getMethods(), placeAbove, placeBelow, false), false, null));
                }
            }

            if (memberGroups.length > 0)
            {
                regions.push(new ElementNodeGroup(memberGroup.caption, memberGroups, [], true, configuration.regions));
            }
        }

        return regions;
    }

    // #endregion Public Methods (6)
}
