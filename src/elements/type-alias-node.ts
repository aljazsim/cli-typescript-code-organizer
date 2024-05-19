import { TypeMemberGroupConfiguration } from "../configuration/type-member-group-configuration";
import { ElementNode } from "./element-node";
import * as ts from "typescript";
import { ElementNodeGroup } from "./element-node-group";
import { TypeMemberType } from "../enums/type-member-type";
import { groupByPlaceAboveBelow, isWritable } from "../helpers/node-helper";
import { MethodSignatureNode } from "./method-signature-node";
import { PropertySignatureNode } from "./property-signature-node";
import { TypeConfiguration } from "../configuration/type-configuration";
export class TypeAliasNode extends ElementNode
{
    // #region Properties (5)

    public readonly membersEnd: number = 0;
    public readonly membersStart: number = 0;
    public readonly methods: PropertySignatureNode[] = [];
    public readonly name: string;
    public readonly properties: PropertySignatureNode[] = [];

    // #endregion Properties (5)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, typeAliasDeclaration: ts.TypeAliasDeclaration, treatArrowFunctionPropertiesAsMethods: boolean)
    {
        super(sourceFile, typeAliasDeclaration);

        this.name = (<ts.Identifier>typeAliasDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(typeAliasDeclaration.name.pos, typeAliasDeclaration.name.end).trim();

        for (const child of typeAliasDeclaration.getChildren(sourceFile))
        {
            if (child.kind === ts.SyntaxKind.TypeLiteral)
            {
                const typeLiteral = child as ts.TypeLiteralNode;

                if (typeLiteral.members && typeLiteral.members.length > 0)
                {
                    this.membersStart = typeLiteral.members[0].getFullStart();
                    this.membersEnd = typeLiteral.members[typeLiteral.members.length - 1].getEnd();

                    // members
                    for (let member of typeLiteral.members)
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
                        else
                        {
                            console.error("Unknow type member");
                        }
                    }
                }
            }
        }
    }

    // #endregion Constructors (1)

    // #region Public Methods (1)

    public organizeMembers(configuration: TypeConfiguration)
    {
        let regions: ElementNodeGroup[] = [];

        for (const memberGroup of configuration.memberGroups)
        {
            const placeAbove = memberGroup.placeAbove;
            const placeBelow = memberGroup.placeBelow;
            const memberGroups: ElementNodeGroup[] = [];

            for (const memberType of memberGroup.memberTypes)
            {
                if (memberType === TypeMemberType.properties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.properties, placeAbove, placeBelow, false), false, null));
                }
                else if (memberType === TypeMemberType.indexes)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.properties, placeAbove, placeBelow, false), false, null));
                }
                else if (memberType === TypeMemberType.methods)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.methods, placeAbove, placeBelow, false), false, null));
                }
            }

            if (memberGroups.length > 0)
            {
                regions.push(new ElementNodeGroup(memberGroup.caption, memberGroups, [], true, configuration.regions));
            }
        }

        return regions;
    }

    // #endregion Public Methods (1)
}
