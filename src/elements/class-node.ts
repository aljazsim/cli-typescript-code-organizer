import * as ts from "typescript";
import { AccessorNode } from "./accessor-node";
import { ConstructorNode } from "./constructor-node";
import { ElementNode } from "./element-node";
import { GetterNode } from "./getter-node";
import { MethodNode } from "./method-node";
import { PropertyNode } from "./property-node";
import { SetterNode } from "./setter-node";
import { StaticBlockDeclarationNode } from "./static-block-declaration-node";
import { getDecorators, getIsAbstract, getIsStatic, groupByPlaceAboveBelow, isPrivate, isProtected, isPublic, isReadOnly, isWritable } from "../helpers/node-helper";
import { ClassMemberGroupConfiguration } from "../configuration/class-member-group-configuration";
import { ElementNodeGroup } from "./element-node-group";
import { ClassMemberType } from "../enums/class-member-type";
import { ClassConfiguration } from "../configuration/class-configuration";

export class ClassNode extends ElementNode
{
    // #region Properties (13)

    public readonly accessors: AccessorNode[] = [];
    public readonly constructors: ConstructorNode[] = [];
    public readonly decorators: string[];
    public readonly getters: GetterNode[] = [];
    public readonly isAbstract: boolean;
    public readonly isStatic: boolean;
    public readonly membersEnd: number = 0;
    public readonly membersStart: number = 0;
    public readonly methods: (MethodNode | PropertyNode)[] = [];
    public readonly name: string;
    public readonly properties: PropertyNode[] = [];
    public readonly setters: SetterNode[] = [];
    public readonly staticBlockDeclarations: StaticBlockDeclarationNode[] = [];

    // #endregion Properties (13)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, classDeclaration: ts.ClassDeclaration, treatArrowFunctionPropertiesAsMethods: boolean)
    {
        super(sourceFile, classDeclaration);

        this.name = (<ts.Identifier>classDeclaration.name).escapedText.toString();

        if (classDeclaration.members && classDeclaration.members.length > 0)
        {
            this.membersStart = classDeclaration.members[0].getFullStart() - classDeclaration.getFullStart() - 2;
            this.membersEnd = classDeclaration.members[classDeclaration.members.length - 1].getEnd() - classDeclaration.getFullStart() + -2;
        }

        this.decorators = getDecorators(classDeclaration, sourceFile);

        this.isAbstract = getIsAbstract(classDeclaration);
        this.isStatic = getIsStatic(classDeclaration);

        // members
        for (let member of classDeclaration.members)
        {
            if (ts.isClassStaticBlockDeclaration(member))
            {
                this.staticBlockDeclarations.push(new StaticBlockDeclarationNode(sourceFile, member));
            }
            else if (ts.isConstructorDeclaration(member))
            {
                this.constructors.push(new ConstructorNode(sourceFile, member));
            }
            else if (ts.isAutoAccessorPropertyDeclaration(member))
            {
                this.accessors.push(new AccessorNode(sourceFile, member));
            }
            else if (ts.isPropertyDeclaration(member))
            {
                if (treatArrowFunctionPropertiesAsMethods && member.initializer?.kind === ts.SyntaxKind.ArrowFunction)
                {
                    this.methods.push(new PropertyNode(sourceFile, member));
                }
                else
                {
                    this.properties.push(new PropertyNode(sourceFile, member));
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
            else if (ts.isMethodDeclaration(member))
            {
                this.methods.push(new MethodNode(sourceFile, member));
            }
        }
    }

    // #endregion Constructors (1)

    // #region Public Methods (1)

    public organizeMembers(configuration: ClassConfiguration)
    {
        let regions: ElementNodeGroup[] = [];

        for (const memberGroup of configuration.memberGroups)
        {
            const placeAbove = memberGroup.placeAbove;
            const placeBelow = memberGroup.placeBelow;
            const memberGroups: ElementNodeGroup[] = [];

            for (const memberType of memberGroup.memberTypes)
            {
                if (memberType === ClassMemberType.privateStaticReadOnlyProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPrivateStaticReadOnlyProperties(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.privateReadOnlyProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPrivateReadOnlyProperties(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.privateStaticProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPrivateStaticProperties(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.privateProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPrivateProperties(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.protectedStaticReadOnlyProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedStaticReadOnlyProperties(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.protectedReadOnlyProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedReadOnlyProperties(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.protectedStaticProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedStaticProperties(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.protectedProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedProperties(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.publicStaticReadOnlyProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicStaticReadOnlyProperties(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.publicReadOnlyProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicReadOnlyProperties(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.publicStaticProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicStaticProperties(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.publicProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicProperties(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.staticBlockDeclarations)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], this.staticBlockDeclarations, false, null));
                }
                else if (memberType === ClassMemberType.constructors)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], this.getConstructors(), false, null));
                }
                else if (memberType === ClassMemberType.publicStaticAccessors)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicStaticAccessors(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.publicAccessors)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicAccessors(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.publicAbstractAccessors)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicAbstractAccessors(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.protectedStaticAccessors)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedStaticAccessors(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.protectedAccessors)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedAccessors(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.protectedAbstractAccessors)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedAbstractAccessors(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.privateStaticAccessors)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPrivateStaticAccessors(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.privateAccessors)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPrivateAccessors(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.publicStaticGettersAndSetters)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicStaticGettersAndSetters(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.publicGettersAndSetters)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicGettersAndSetters(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.publicAbstractGettersAndSetters)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicAbstractGettersAndSetters(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.protectedStaticGettersAndSetters)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedStaticGettersAndSetters(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.protectedGettersAndSetters)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedGettersAndSetters(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.protectedAbstractGettersAndSetters)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedAbstractGettersAndSetters(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.privateStaticGettersAndSetters)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPrivateStaticGettersAndSetters(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.privateGettersAndSetters)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPrivateGettersAndSetters(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.publicStaticMethods)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicStaticMethods(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.publicMethods)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicMethods(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.publicAbstractMethods)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicAbstractMethods(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.protectedStaticMethods)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedStaticMethods(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.protectedMethods)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedMethods(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.protectedAbstractMethods)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedAbstractMethods(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.privateStaticMethods)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPrivateStaticMethods(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
                }
                else if (memberType === ClassMemberType.privateMethods)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPrivateMethods(), placeAbove, placeBelow, configuration.members.groupMembersWithDecorators), false, null));
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

    // #region Private Methods (37)

    private getConstructors()
    {
        return this.constructors;
    }

    private getPrivateAccessors()
    {
        return this.accessors.filter(x => isPrivate(x) && !x.isStatic && !x.isAbstract);
    }

    private getPrivateGettersAndSetters()
    {
        return this.getters.concat(this.setters).filter(x => isPrivate(x) && !x.isStatic && !x.isAbstract);
    }

    private getPrivateMethods()
    {
        return this.methods.filter(x => isPrivate(x) && !x.isStatic && !x.isAbstract);
    }

    private getPrivateProperties()
    {
        return this.properties.filter(x => isPrivate(x) && isWritable(x) && !x.isStatic);
    }

    private getPrivateReadOnlyProperties()
    {
        return this.properties.filter(x => isPrivate(x) && isReadOnly(x) && !x.isStatic);
    }

    private getPrivateStaticAccessors()
    {
        return this.accessors.filter(x => isPrivate(x) && x.isStatic && !x.isAbstract);
    }

    private getPrivateStaticGettersAndSetters()
    {
        return this.getters.concat(this.setters).filter(x => isPrivate(x) && x.isStatic && !x.isAbstract);
    }

    private getPrivateStaticMethods()
    {
        return this.methods.filter(x => isPrivate(x) && x.isStatic && !x.isAbstract);
    }

    private getPrivateStaticProperties()
    {
        return this.properties.filter(x => isPrivate(x) && isWritable(x) && x.isStatic);
    }

    private getPrivateStaticReadOnlyProperties()
    {
        return this.properties.filter(x => isPrivate(x) && isReadOnly(x) && x.isStatic);
    }

    private getProtectedAbstractAccessors()
    {
        return this.accessors.filter(x => isProtected(x) && !x.isStatic && x.isAbstract);
    }

    private getProtectedAbstractGettersAndSetters()
    {
        return this.getters.concat(this.setters).filter(x => isProtected(x) && !x.isStatic && x.isAbstract);
    }

    private getProtectedAbstractMethods()
    {
        return this.methods.filter(x => isProtected(x) && !x.isStatic && x.isAbstract);
    }

    private getProtectedAccessors()
    {
        return this.accessors.filter(x => isProtected(x) && !x.isStatic && !x.isAbstract);
    }

    private getProtectedGettersAndSetters()
    {
        return this.getters.concat(this.setters).filter(x => isProtected(x) && !x.isStatic && !x.isAbstract);
    }

    private getProtectedMethods()
    {
        return this.methods.filter(x => isProtected(x) && !x.isStatic && !x.isAbstract);
    }

    private getProtectedProperties()
    {
        return this.properties.filter(x => isProtected(x) && isWritable(x) && !x.isStatic);
    }

    private getProtectedReadOnlyProperties()
    {
        return this.properties.filter(x => isProtected(x) && isReadOnly(x) && !x.isStatic);
    }

    private getProtectedStaticAccessors()
    {
        return this.accessors.filter(x => isProtected(x) && x.isStatic && !x.isAbstract);
    }

    private getProtectedStaticGettersAndSetters()
    {
        return this.getters.concat(this.setters).filter(x => isProtected(x) && x.isStatic && !x.isAbstract);
    }

    private getProtectedStaticMethods()
    {
        return this.methods.filter(x => isProtected(x) && x.isStatic && !x.isAbstract);
    }

    private getProtectedStaticProperties()
    {
        return this.properties.filter(x => isProtected(x) && isWritable(x) && x.isStatic);
    }

    private getProtectedStaticReadOnlyProperties()
    {
        return this.properties.filter(x => isProtected(x) && isReadOnly(x) && x.isStatic);
    }

    private getPublicAbstractAccessors()
    {
        return this.accessors.filter(x => isPublic(x) && !x.isStatic && x.isAbstract);
    }

    private getPublicAbstractGettersAndSetters()
    {
        return this.getters.concat(this.setters).filter(x => isPublic(x) && !x.isStatic && x.isAbstract);
    }

    private getPublicAbstractMethods()
    {
        return this.methods.filter(x => isPublic(x) && !x.isStatic && x.isAbstract);
    }

    private getPublicAccessors()
    {
        return this.accessors.filter(x => isPublic(x) && !x.isStatic && !x.isAbstract);
    }

    private getPublicGettersAndSetters()
    {
        return this.getters.concat(this.setters).filter(x => isPublic(x) && !x.isStatic && !x.isAbstract);
    }

    private getPublicMethods()
    {
        return this.methods.filter(x => isPublic(x) && !x.isStatic && !x.isAbstract);
    }

    private getPublicProperties()
    {
        return this.properties.filter(x => isPublic(x) && isWritable(x) && !x.isStatic);
    }

    private getPublicReadOnlyProperties()
    {
        return this.properties.filter(x => isPublic(x) && isReadOnly(x) && !x.isStatic);
    }

    private getPublicStaticAccessors()
    {
        return this.accessors.filter(x => isPublic(x) && x.isStatic && !x.isAbstract);
    }

    private getPublicStaticGettersAndSetters()
    {
        return this.getters.concat(this.setters).filter(x => isPublic(x) && x.isStatic && !x.isAbstract);
    }

    private getPublicStaticMethods()
    {
        return this.methods.filter(x => isPublic(x) && x.isStatic && !x.isAbstract);
    }

    private getPublicStaticProperties()
    {
        return this.properties.filter(x => isPublic(x) && isWritable(x) && x.isStatic);
    }

    private getPublicStaticReadOnlyProperties()
    {
        return this.properties.filter(x => isPublic(x) && isReadOnly(x) && x.isStatic);
    }

    // #endregion Private Methods (37)
}
