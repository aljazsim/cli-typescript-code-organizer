import { TypeMemberGroupConfiguration } from "../configuration/type-member-group-configuration";
import { ElementNode } from "./element-node";
import * as ts from "typescript";
import { ElementNodeGroup } from "./element-node-group";
import { TypeMemberType } from "../enums/type-member-type";
import { groupByPlaceAboveBelow, isWritable } from "../helpers/node-helper";
import { MethodSignatureNode } from "./method-signature-node";
import { PropertySignatureNode } from "./property-signature-node";

export class TypeAliasNode extends ElementNode
{
    // #region Properties (3)

    public readonly methods: MethodSignatureNode[] = [];
    public readonly name: string;
    public readonly properties: PropertySignatureNode[] = [];

    // #endregion Properties (3)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, typeAliasDeclaration: ts.TypeAliasDeclaration)
    {
        super(sourceFile, typeAliasDeclaration);

        this.name = (<ts.Identifier>typeAliasDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(typeAliasDeclaration.name.pos, typeAliasDeclaration.name.end).trim();

        // TODO
        // // if (typeAliasDeclaration.getChildren() && typeAliasDeclaration.getChildAt().length > 0)
        // // {
        // //     this.membersStart = typeAliasDeclaration.members[0].getFullStart();
        // //     this.membersEnd = typeAliasDeclaration.members[typeAliasDeclaration.members.length - 1].getEnd();
        // // }
    }

    // #endregion Constructors (1)

    // #region Public Methods (3)

    public getMethods()
    {
        return this.methods;
    }

    public getProperties()
    {
        return this.properties.filter((x) => isWritable(x));
    }

    public organizeMembers(memberTypeOrder: TypeMemberGroupConfiguration[])
    {
        let regions: ElementNodeGroup[] = [];

        for (const memberTypeGroup of memberTypeOrder)
        {
            const placeAbove = memberTypeGroup.placeAbove;
            const placeBelow = memberTypeGroup.placeBelow;
            const memberGroups: ElementNodeGroup[] = [];

            for (const memberType of memberTypeGroup.memberTypes)
            {
                if (memberType === TypeMemberType.properties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProperties(), placeAbove, placeBelow, false), false));
                }
                if (memberType === TypeMemberType.methods)
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

    // #endregion Public Methods (3)
}
