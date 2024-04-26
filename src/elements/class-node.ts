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

export class ClassNode extends ElementNode
{
  // #region Properties (12)

  public readonly accessors: AccessorNode[] = [];
  public readonly constructors: ConstructorNode[] = [];
  public readonly getters: GetterNode[] = [];
  public readonly indexes: IndexNode[] = [];
  public readonly isAbstract: boolean;
  public readonly isStatic: boolean;
  public readonly membersEnd: number = 0;
  public readonly membersStart: number = 0;
  public readonly methods: (MethodNode | PropertyNode)[] = [];
  public readonly properties: PropertyNode[] = [];
  public readonly setters: SetterNode[] = [];
  public readonly staticBlockDeclarations: StaticBlockDeclarationNode[] = [];

  // #endregion Properties (12)

  // #region Constructors (1)

  constructor(sourceFile: ts.SourceFile, classDeclaration: ts.ClassDeclaration)
  {
    super(classDeclaration);

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
  }

  // #endregion Constructors (1)

  // #region Public Methods (45)

  public getConstructors()
  {
    return this.constructors;
  }

  public getPrivateAccessors()
  {
    return this.accessors.filter(x => this.isPrivate(x) && !x.isStatic && !x.isAbstract);
  }

  public getPrivateConstProperties()
  {
    return this.properties.filter(x => this.isPrivate(x) && this.isConstant(x) && !x.isStatic);
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

  public getPrivateStaticConstProperties()
  {
    return this.properties.filter(x => this.isPrivate(x) && this.isConstant(x) && x.isStatic);
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

  public getProtectedConstProperties()
  {
    return this.properties.filter(x => this.isProtected(x) && this.isConstant(x) && !x.isStatic);
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

  public getProtectedStaticConstProperties()
  {
    return this.properties.filter(x => this.isProtected(x) && this.isConstant(x) && x.isStatic);
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

  public getPublicConstProperties()
  {
    return this.properties.filter(x => this.isPublic(x) && this.isConstant(x) && !x.isStatic);
  }

  public getPublicGettersAndSetters()
  {
    return this.getters.concat(this.setters).filter(x => this.isPublic(x) && !x.isStatic && !x.isAbstract);
  }

  public getPublicIndexes()
  {
    return this.indexes.filter(x => this.isPublic(x) && !x.isStatic && !x.isAbstract);
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

  public getPublicStaticConstProperties()
  {
    return this.properties.filter(x => this.isPublic(x) && this.isConstant(x) && x.isStatic);
  }

  public getPublicStaticGettersAndSetters()
  {
    return this.getters.concat(this.setters).filter(x => this.isPublic(x) && x.isStatic && !x.isAbstract);
  }

  public getPublicStaticIndexes()
  {
    return this.indexes.filter(x => this.isPublic(x) && x.isStatic && !x.isAbstract);
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

  // #endregion Public Methods (45)
}
