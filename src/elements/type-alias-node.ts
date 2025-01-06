import { TypeMemberGroupConfiguration } from "../configuration/type-member-group-configuration.js";
import { ElementNode } from "./element-node.js";
import { ElementNodeGroup } from "./element-node-group.js";
import { TypeMemberType } from "../enums/type-member-type.js";
import { order, isWritable } from "../helpers/node-helper.js";
import { MethodSignatureNode } from "./method-signature-node.js";
import { PropertySignatureNode } from "./property-signature-node.js";
import { TypeConfiguration } from "../configuration/type-configuration.js";
import { IndexSignatureNode } from "./index-signature-node.js";

import * as ts from "typescript";
export class TypeAliasNode extends ElementNode
{
    // #region Properties (6)

    public readonly indexes: IndexSignatureNode[] = [];
    public readonly membersEnd: number = 0;
    public readonly membersStart: number = 0;
    public readonly methods: MethodSignatureNode[] = [];
    public readonly name: string;
    public readonly properties: PropertySignatureNode[] = [];

    // #endregion Properties (6)

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
                    this.membersStart = typeLiteral.members[0].getFullStart() - typeAliasDeclaration.getFullStart();
                    this.membersEnd = typeLiteral.members[typeLiteral.members.length - 1].getEnd() - typeAliasDeclaration.getFullStart();

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
            const sortDirection = memberGroup.sortDirection;
            const placeAbove = memberGroup.placeAbove;
            const placeBelow = memberGroup.placeBelow;
            const memberGroups: ElementNodeGroup[] = [];

            for (const memberType of memberGroup.memberTypes)
            {
                let elementNodes = Array<ElementNode>();

                if (memberType === TypeMemberType.properties)
                {
                    elementNodes = this.properties;
                }
                else if (memberType === TypeMemberType.indexes)
                {
                    elementNodes = this.indexes;
                }
                else if (memberType === TypeMemberType.methods)
                {
                    elementNodes = this.methods;
                }

                if (elementNodes.length > 0)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], order(sortDirection, elementNodes, placeAbove, placeBelow, false), false, null));
                }
            }

            if (memberGroups.length > 0)
            {
                if (memberGroup.memberTypesGrouped)
                {
                    regions.push(new ElementNodeGroup(memberGroup.caption, memberGroups, [], true, configuration.regions));
                }
                else 
                {
                    regions.push(new ElementNodeGroup(memberGroup.caption, [], order(sortDirection, memberGroups.flatMap(mg => mg.nodes), placeAbove, placeBelow, false), true, configuration.regions));
                }
            }
        }

        return regions;
    }

    // #endregion Public Methods (1)
}
