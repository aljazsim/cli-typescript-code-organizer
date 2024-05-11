import * as ts from "typescript";
import { AccessorNode } from "./accessor-node";
import { ConstructorNode } from "./constructor-node";
import { ElementNode } from "./element-node";
import { GetterNode } from "./getter-node";
import { IndexNode } from "./index-node";
import { MethodNode } from "./method-node";
import { PropertyNode } from "./property-node";
import { SetterNode } from "./setter-node";
import { StaticBlockDeclarationNode } from "./static-block-declaration-node";
import { groupByPlaceAboveBelow } from "../helpers/node-helper";
import { ClassMemberGroupConfiguration } from "../configuration/class-member-group-configuration";
import { ElementNodeGroup } from "./element-node-group";
import { ClassMemberType } from "../enums/class-member-type";

export class ClassNode extends ElementNode
{
    // #region Properties (11)

    public readonly accessors: AccessorNode[] = [];
    public readonly constructors: ConstructorNode[] = [];
    public readonly getters: GetterNode[] = [];
    public readonly isAbstract: boolean;
    public readonly isStatic: boolean;
    public readonly membersEnd: number = 0;
    public readonly membersStart: number = 0;
    public readonly methods: (MethodNode | PropertyNode)[] = [];
    public readonly properties: PropertyNode[] = [];
    public readonly setters: SetterNode[] = [];
    public readonly staticBlockDeclarations: StaticBlockDeclarationNode[] = [];

    // #endregion Properties (11)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, classDeclaration: ts.ClassDeclaration, treatArrowFunctionPropertiesAsMethods: boolean)
    {
        super(sourceFile, classDeclaration);

        this._name = (<ts.Identifier>classDeclaration.name).escapedText.toString();

        this._fullStart = classDeclaration.getFullStart();
        this._end = classDeclaration.getEnd();
        this._start = classDeclaration.getStart(sourceFile, false);

        if (classDeclaration.members && classDeclaration.members.length > 0)
        {
            this.membersStart = classDeclaration.members[0].getFullStart();
            this.membersEnd = classDeclaration.members[classDeclaration.members.length - 1].getEnd();
        }

        this._decorators = this.getDecorators(classDeclaration, sourceFile);

        this.isAbstract = this.getIsAbstract(classDeclaration);
        this.isStatic = this.getIsStatic(classDeclaration);

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

    // #region Public Methods (44)

    public getConstructors()
    {
        return this.constructors;
    }

    public getPrivateAccessors()
    {
        return this.accessors.filter(x => this.isPrivate(x) && !x.isStatic && !x.isAbstract);
    }

    public getPrivateGettersAndSetters()
    {
        return this.getters.concat(this.setters).filter(x => this.isPrivate(x) && !x.isStatic && !x.isAbstract);
    }

    public getPrivateMethods()
    {
        return this.methods.filter(x => this.isPrivate(x) && !x.isStatic && !x.isAbstract);
    }

    public getPrivateProperties()
    {
        return this.properties.filter(x => this.isPrivate(x) && this.isWritable(x) && !x.isStatic);
    }

    public getPrivateReadOnlyProperties()
    {
        return this.properties.filter(x => this.isPrivate(x) && this.isReadOnly(x) && !x.isStatic);
    }

    public getPrivateStaticAccessors()
    {
        return this.accessors.filter(x => this.isPrivate(x) && x.isStatic && !x.isAbstract);
    }

    public getPrivateStaticGettersAndSetters()
    {
        return this.getters.concat(this.setters).filter(x => this.isPrivate(x) && x.isStatic && !x.isAbstract);
    }

    public getPrivateStaticMethods()
    {
        return this.methods.filter(x => this.isPrivate(x) && x.isStatic && !x.isAbstract);
    }

    public getPrivateStaticProperties()
    {
        return this.properties.filter(x => this.isPrivate(x) && this.isWritable(x) && x.isStatic);
    }

    public getPrivateStaticReadOnlyProperties()
    {
        return this.properties.filter(x => this.isPrivate(x) && this.isReadOnly(x) && x.isStatic);
    }

    public getProtectedAbstractAccessors()
    {
        return this.accessors.filter(x => this.isProtected(x) && !x.isStatic && x.isAbstract);
    }

    public getProtectedAbstractGettersAndSetters()
    {
        return this.getters.concat(this.setters).filter(x => this.isProtected(x) && !x.isStatic && x.isAbstract);
    }

    public getProtectedAbstractMethods()
    {
        return this.methods.filter(x => this.isProtected(x) && !x.isStatic && x.isAbstract);
    }

    public getProtectedAccessors()
    {
        return this.accessors.filter(x => this.isProtected(x) && !x.isStatic && !x.isAbstract);
    }

    public getProtectedGettersAndSetters()
    {
        return this.getters.concat(this.setters).filter(x => this.isProtected(x) && !x.isStatic && !x.isAbstract);
    }

    public getProtectedMethods()
    {
        return this.methods.filter(x => this.isProtected(x) && !x.isStatic && !x.isAbstract);
    }

    public getProtectedProperties()
    {
        return this.properties.filter(x => this.isProtected(x) && this.isWritable(x) && !x.isStatic);
    }

    public getProtectedReadOnlyProperties()
    {
        return this.properties.filter(x => this.isProtected(x) && this.isReadOnly(x) && !x.isStatic);
    }

    public getProtectedStaticAccessors()
    {
        return this.accessors.filter(x => this.isProtected(x) && x.isStatic && !x.isAbstract);
    }

    public getProtectedStaticGettersAndSetters()
    {
        return this.getters.concat(this.setters).filter(x => this.isProtected(x) && x.isStatic && !x.isAbstract);
    }

    public getProtectedStaticMethods()
    {
        return this.methods.filter(x => this.isProtected(x) && x.isStatic && !x.isAbstract);
    }

    public getProtectedStaticProperties()
    {
        return this.properties.filter(x => this.isProtected(x) && this.isWritable(x) && x.isStatic);
    }

    public getProtectedStaticReadOnlyProperties()
    {
        return this.properties.filter(x => this.isProtected(x) && this.isReadOnly(x) && x.isStatic);
    }

    public getPublicAbstractAccessors()
    {
        return this.accessors.filter(x => this.isPublic(x) && !x.isStatic && x.isAbstract);
    }

    public getPublicAbstractGettersAndSetters()
    {
        return this.getters.concat(this.setters).filter(x => this.isPublic(x) && !x.isStatic && x.isAbstract);
    }

    public getPublicAbstractMethods()
    {
        return this.methods.filter(x => this.isPublic(x) && !x.isStatic && x.isAbstract);
    }

    public getPublicAccessors()
    {
        return this.accessors.filter(x => this.isPublic(x) && !x.isStatic && !x.isAbstract);
    }

    public getPublicGettersAndSetters()
    {
        return this.getters.concat(this.setters).filter(x => this.isPublic(x) && !x.isStatic && !x.isAbstract);
    }

    public getPublicMethods()
    {
        return this.methods.filter(x => this.isPublic(x) && !x.isStatic && !x.isAbstract);
    }

    public getPublicProperties()
    {
        return this.properties.filter(x => this.isPublic(x) && this.isWritable(x) && !x.isStatic);
    }

    public getPublicReadOnlyProperties()
    {
        return this.properties.filter(x => this.isPublic(x) && this.isReadOnly(x) && !x.isStatic);
    }

    public getPublicStaticAccessors()
    {
        return this.accessors.filter(x => this.isPublic(x) && x.isStatic && !x.isAbstract);
    }

    public getPublicStaticGettersAndSetters()
    {
        return this.getters.concat(this.setters).filter(x => this.isPublic(x) && x.isStatic && !x.isAbstract);
    }

    public getPublicStaticMethods()
    {
        return this.methods.filter(x => this.isPublic(x) && x.isStatic && !x.isAbstract);
    }

    public getPublicStaticProperties()
    {
        return this.properties.filter(x => this.isPublic(x) && this.isWritable(x) && x.isStatic);
    }

    public getPublicStaticReadOnlyProperties()
    {
        return this.properties.filter(x => this.isPublic(x) && this.isReadOnly(x) && x.isStatic);
    }

    public organizeMembers(memberTypeOrder: ClassMemberGroupConfiguration[], groupElementsWithDecorators: boolean)
    {
        let regions: ElementNodeGroup[] = [];

        for (const memberTypeGroup of memberTypeOrder)
        {
            const placeAbove = memberTypeGroup.placeAbove;
            const placeBelow = memberTypeGroup.placeBelow;
            const memberGroups: ElementNodeGroup[] = [];

            for (const memberType of memberTypeGroup.memberTypes)
            {
                if (memberType === ClassMemberType.privateStaticReadOnlyProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPrivateStaticReadOnlyProperties(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.privateReadOnlyProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPrivateReadOnlyProperties(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.privateStaticProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPrivateStaticProperties(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.privateProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPrivateProperties(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.protectedStaticReadOnlyProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedStaticReadOnlyProperties(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.protectedReadOnlyProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedReadOnlyProperties(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.protectedStaticProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedStaticProperties(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.protectedProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedProperties(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.publicStaticReadOnlyProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicStaticReadOnlyProperties(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.publicReadOnlyProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicReadOnlyProperties(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.publicStaticProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicStaticProperties(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.publicProperties)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicProperties(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.staticBlockDeclarations)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], this.staticBlockDeclarations, false));
                }
                else if (memberType === ClassMemberType.constructors)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], this.getConstructors(), false));
                }
                else if (memberType === ClassMemberType.publicStaticAccessors)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicStaticAccessors(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.publicAccessors)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicAccessors(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.publicAbstractAccessors)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicAbstractAccessors(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.protectedStaticAccessors)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedStaticAccessors(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.protectedAccessors)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedAccessors(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.protectedAbstractAccessors)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedAbstractAccessors(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.privateStaticAccessors)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPrivateStaticAccessors(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.privateAccessors)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPrivateAccessors(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.publicStaticGettersAndSetters)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicStaticGettersAndSetters(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.publicGettersAndSetters)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicGettersAndSetters(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.publicAbstractGettersAndSetters)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicAbstractGettersAndSetters(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.protectedStaticGettersAndSetters)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedStaticGettersAndSetters(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.protectedGettersAndSetters)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedGettersAndSetters(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.protectedAbstractGettersAndSetters)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedAbstractGettersAndSetters(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.privateStaticGettersAndSetters)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPrivateStaticGettersAndSetters(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.privateGettersAndSetters)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPrivateGettersAndSetters(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.publicStaticMethods)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicStaticMethods(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.publicMethods)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicMethods(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.publicAbstractMethods)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPublicAbstractMethods(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.protectedStaticMethods)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedStaticMethods(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.protectedMethods)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedMethods(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.protectedAbstractMethods)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getProtectedAbstractMethods(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.privateStaticMethods)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPrivateStaticMethods(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
                else if (memberType === ClassMemberType.privateMethods)
                {
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(this.getPrivateMethods(), placeAbove, placeBelow, groupElementsWithDecorators), false));
                }
            }

            if (memberGroups.length > 0)
            {
                regions.push(new ElementNodeGroup(memberTypeGroup.caption, memberGroups, [], true));
            }
        }

        return regions;
    }

    // #endregion Public Methods (44)
}
