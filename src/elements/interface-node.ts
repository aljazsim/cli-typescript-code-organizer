import * as ts from "typescript";
import { AccessorNode } from "./accessor-node";
import { ElementNode } from "./element-node";
import { GetterNode } from "./getter-node";
import { IndexSignatureNode } from "./index-signature-node";
import { MethodSignatureNode } from "./method-signature-node";
import { PropertySignatureNode } from "./property-signature-node";
import { SetterNode } from "./setter-node";

export class InterfaceNode extends ElementNode
{
    // #region Properties (8)

    public readonly accessors: AccessorNode[] = [];
    public readonly getters: GetterNode[] = [];
    public readonly indexes: IndexSignatureNode[] = [];
    public readonly membersEnd: number = 0;
    public readonly membersStart: number = 0;
    public readonly methods: MethodSignatureNode[] = [];
    public readonly properties: PropertySignatureNode[] = [];
    public readonly setters: SetterNode[] = [];

    // #endregion Properties (8)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, interfaceDeclaration: ts.InterfaceDeclaration)
    {
        super(interfaceDeclaration);

        this._name = (<ts.Identifier>interfaceDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(interfaceDeclaration.name.pos, interfaceDeclaration.name.end).trim();

        this._fullStart = interfaceDeclaration.getFullStart();
        this._end = interfaceDeclaration.getEnd();
        this._start = interfaceDeclaration.getStart(sourceFile, false);

        if (interfaceDeclaration.members && interfaceDeclaration.members.length > 0)
        {
            this.membersStart = interfaceDeclaration.members[0].getFullStart();
            this.membersEnd = interfaceDeclaration.members[interfaceDeclaration.members.length - 1].getEnd();
        }
    }

    // #endregion Constructors (1)

    // #region Public Methods (7)

    public getAccessors()
    {
        return this.accessors;
    }

    public getConstProperties()
    {
        return this.properties.filter((x) => this.isConstant(x));
    }

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

    // #endregion Public Methods (7)
}
