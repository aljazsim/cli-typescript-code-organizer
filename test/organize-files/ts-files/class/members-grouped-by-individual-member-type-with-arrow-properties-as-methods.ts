import ts, { SourceFile } from "typescript";

import "../../../configurations/default-configuration-with-no-regions.json";
import "./missing-file.json";

import { TestInterface } from "../interface/test-interface";
import { decoratorA, decoratorB, decoratorC, decoratorD, decoratorE } from "./test-decorators";

export abstract class TestClass implements TestInterface
{
    // #region Private Static ReadOnly Properties (2)

    // this is a comment
    private static readonly privateStaticReadonlyProperty1 = "nt4r2igy03";
    // also a comment
    private static readonly privateStaticReadonlyProperty2: string | undefined = "ckrxombx0g";

    // #endregion Private Static ReadOnly Properties

    // #region Private Readonly Properties (3)

    @decoratorC(7960805480)
    private readonly privateReadonlyProperty1: string | undefined = "ohqx31vc3a";
    private readonly privateReadonlyProperty2 = "jwm4jkf16m";
    @decoratorC(7573192855)
    private readonly privateReadonlyProperty4: String = "709w42symh";

    // #endregion Private Readonly Properties

    // #region Private Static Properties (8)

    private static _privateStaticGetterSetter1: string;
    private static _privateStaticGetterSetter2: string;
    private static _protectedStaticGetterSetter1: string;
    private static _protectedStaticGetterSetter2: string;
    private static _publicStaticGetterSetter1: string;
    private static _publicStaticGetterSetter2: string;
    private static privateStaticProperty1: boolean;
    private static privateStaticProperty2 = new Date();

    // #endregion Private Static Properties

    // #region Private Properties (6)

    private _privateGetterSetter1: string = "";
    private _protectedGetterSetter1: string = "";
    private _publicGetterSetter1: string = "";
    @decoratorB()
    private privateProperty1: SourceFile | undefined;
    #privateProperty2: string;
    private privateProperty3 = async function () { return Promise.resolve(''); };

    // #endregion Private Properties

    // #region Protected Static ReadOnly Properties (2)

    protected static readonly protectedStaticReadonlyProperty1 = "cc7r9dr3zj";
    /*
     * This is documentation.
     */
    @decoratorB()
    protected static readonly protectedStaticReadonlyProperty2 = "oyasnkxrza";

    // #endregion Protected Static ReadOnly Properties

    // #region Protected ReadOnly Properties (6)

    protected readonly protectedReadonlyProperty1 = "tbgokvjelv";
    protected abstract readonly protectedReadonlyProperty2: string;
    @decoratorA("dozslltkqe")
    @decoratorC(2939536033)
    protected readonly protectedReadonlyProperty3 = 1187372274;
    protected readonly protectedReadonlyProperty4 = 6494372165;
    @decoratorB()
    protected readonly protectedReadonlyProperty5 = 4089519931;
    protected readonly protectedReadonlyProperty6 = 4099945367;

    // #endregion Protected ReadOnly Properties

    // #region Protected Static Properties (2)

    @decoratorC(9860836855)
    protected static protectedStaticProperty1 = 8522782648;
    protected static protectedStaticProperty2 = "hyc8khk2oj";

    // #endregion Protected Static Properties

    // #region Protected Properties (2)

    protected protectedProperty1 = "jwm4jkf16m";
    protected protectedProperty2: Number = 9777108868;

    // #endregion Protected Properties

    // #region Public Static ReadOnly Properties (3)

    @decoratorB()
    public static readonly publicStaticReadonlyProperty1: Number = 8345836946;
    public static readonly publicStaticReadonlyProperty2: string;
    @decoratorB()
    public static readonly publicStaticReadonlyProperty3: Number;

    // #endregion Public Static ReadOnly Properties

    // #region Public ReadOnly Properties (8)

    public readonly publicReadonlyProperty2 = "uialqi4dkc";
    public readonly publicReadonlyProperty3: String = "16";
    public readonly publicReadonlyProperty4: string = "NULL";
    public readonly publicReadonlyProperty5: string = '15';
    public readonly publicReadonlyProperty6: string | undefined;
    public readonly publicReadonlyProperty7 = "";
    public readonly publicReadonlyProperty8: number = 3;
    public readonly publicReadonlyProperty9: string = "1";

    // #endregion Public ReadOnly Properties

    // #region Public Static Properties (1)

    public static publicStaticProperty2: Number;

    // #endregion Public Static Properties

    // #region Public Properties (8)

    public publicProperty1: string = "";
    @decoratorA("qeyfjngywl")
    public publicProperty2 = "pe2bmn4hgi";
    public publicProperty3: string | undefined = undefined;
    public publicProperty4: string = "4";
    public publicProperty5 = 6;
    public publicProperty7: string = "1";
    public publicProperty8 = true;
    public publicProperty9: string | null = "1";

    // #endregion Public Properties

    // #region Static Block Declarations (1)

    static {
        this.protectedStaticProperty1 = 4286562276;
        this.privateStaticProperty1 = true;
    }

    // #endregion Static Block Declarations

    // #region Constructors (1)

    constructor(private readonly name: string)
    {
        this.#privateProperty2 = "xzfkmndzen";
        this.publicProperty1 = name;
    }

    // #endregion Constructors

    // #region Public Static Accessors (3)

    @decoratorD()
    public static accessor publicStaticAccessor1: boolean | undefined;
    public static accessor publicStaticAccessor2: number;
    @decoratorD()
    @decoratorE()
    public static accessor publicStaticAccessor3: boolean | undefined;

    // #endregion Public Static Accessors

    // #region Public Accessors (3)

    public accessor publicAccessor1: number = 111;
    public accessor publicAccessor2: number = 8647818341;
    public accessor publicAccessor3 = 4184534899;

    // #endregion Public Accessors

    // #region Public Abstract Accessors (4)

    @decoratorD()
    public abstract accessor publicAbstractAccessor1: string;
    @decoratorD()
    public abstract accessor publicAbstractAccessor2: boolean | undefined;
    @decoratorD()
    public abstract accessor publicAbstractAccessor3: string;
    public abstract accessor publicAbstractAccessor4: boolean | undefined;

    // #endregion Public Abstract Accessors

    // #region Protected Static Accessors (2)

    protected static accessor protectedStaticAccessor1: boolean | undefined;
    protected static accessor protectedStaticAccessor2: boolean | undefined;

    // #endregion Protected Static Accessors

    // #region Protected Accessors (2)

    @decoratorD()
    protected accessor protectedAccessor1: boolean | undefined;
    @decoratorE()
    @decoratorE()
    protected accessor protectedAccessor2: boolean | undefined;

    // #endregion Protected Accessors

    // #region Protected Abstract Accessors (3)

    protected abstract accessor protectedAbstractAccessor1: boolean | undefined;
    protected abstract accessor protectedAbstractAccessor2: string;
    @decoratorD()
    protected abstract accessor protectedAbstractAccessor3: boolean | undefined;

    // #endregion Protected Abstract Accessors

    // #region Private Static Accessors (2)

    private static accessor privateStaticAccessor1: boolean | undefined;
    @decoratorD()
    private static accessor privateStaticAccessor2: string;

    // #endregion Private Static Accessors

    // #region Private Accessors (2)

    @decoratorD()
    private accessor privateAccessor1: boolean | undefined;
    private accessor privateAccessor2: boolean | undefined;

    // #endregion Private Accessors

    // #region Public Static Getters And Setters (6)

    public static get publicStaticGetterSetter1(): string
    {
        return this._publicStaticGetterSetter1;
    }

    public static set publicStaticGetterSetter1(value: string)
    {
        this._publicStaticGetterSetter1 = value;
    }

    public static get publicStaticGetterSetter2(): string
    {
        return this._publicStaticGetterSetter2;
    }

    public static set publicStaticGetterSetter2(value: string)
    {
        this._publicStaticGetterSetter2 = value;
    }

    public static get publicStaticGetterSetter3()
    {
        return "zkugxgqjen";
    }

    public static set publicStaticGetterSetter4(value: string)
    {
    }

    // #endregion Public Static Getters And Setters

    // #region Public Getters And Setters (12)

    public get accessor1(): string
    {
        return "1";
    }

    public get publicGetter1(): number
    {
        return 3;
    }

    public set publicGetter1(size: number)
    {
    }

    public get publicGetter2(): number
    {
        return 2;
    }

    public set publicGetter3(size: number)
    {
    }

    public get publicGetter4(): any
    {
        return 2;
    }

    @decoratorE()
    public get publicGetterSetter1(): string
    {
        return this._publicGetterSetter1;
    }

    public set publicGetterSetter1(value: string)
    {
        this._publicGetterSetter1 = value;
    }

    public set publicSetter1(value: any)
    {
    }

    public set publicSetter2(value: any)
    {
    }

    public set publicSetter3(value: number)
    {
    }

    public set publicSetter4(value: any)
    {
    }

    // #endregion Public Getters And Setters

    // #region Public Abstract Getters And Setters (6)

    public abstract get publicAbstractGetterSetter1(): string;

    public abstract set publicAbstractGetterSetter1(value: string);

    public abstract get publicAbstractGetterSetter2(): string;

    public abstract set publicAbstractGetterSetter2(value: string);

    public abstract set publicAbstractGetterSetter3(value: string);

    public abstract get publicAbstractGetterSetter4(): string;

    // #endregion Public Abstract Getters And Setters

    // #region Protected Static Getters And Setters (6)

    protected static get protectedStaticGetterSetter1(): string
    {
        return this._protectedStaticGetterSetter1;
    }

    // a comment
    protected static set protectedStaticGetterSetter1(value: string)
    {
        this._protectedStaticGetterSetter1 = value;
    }

    @decoratorB()
    protected static get protectedStaticGetterSetter2(): string
    {
        return this._protectedStaticGetterSetter2;
    }

    protected static set protectedStaticGetterSetter2(value: string)
    {
        this._protectedStaticGetterSetter2 = value;
    }

    protected static get protectedStaticGetterSetter3()
    {
        return "zkugxgqjen";
    }

    protected static set protectedStaticGetterSetter4(value: string)
    {
    }

    // #endregion Protected Static Getters And Setters

    // #region Protected Getters And Setters (2)

    @decoratorE()
    protected get protectedGetterSetter1(): string
    {
        return this._protectedGetterSetter1;
    }

    protected set protectedGetterSetter1(value: string)
    {
        this._protectedGetterSetter1 = value;
    }

    // #endregion Protected Getters And Setters

    // #region Protected Abstract Getters And Setters (6)

    protected abstract get protectedAbstractGetterSetter1(): string;

    protected abstract set protectedAbstractGetterSetter1(value: string);

    protected abstract get protectedAbstractGetterSetter2(): string;

    protected abstract set protectedAbstractGetterSetter2(value: string);

    protected abstract set protectedAbstractGetterSetter3(value: string);

    protected abstract get protectedAbstractGetterSetter4(): string;

    // #endregion Protected Abstract Getters And Setters

    // #region Private Static Getters And Setters (6)

    private static get privateStaticGetterSetter1(): string
    {
        return this._privateStaticGetterSetter1;
    }

    private static set privateStaticGetterSetter1(value: string)
    {
        this._privateStaticGetterSetter1 = value;
    }

    private static get privateStaticGetterSetter2(): string
    {
        return this._privateStaticGetterSetter2;
    }

    private static set privateStaticGetterSetter2(value: string)
    {
        this._privateStaticGetterSetter2 = value;
    }

    private static get privateStaticGetterSetter3()
    {
        return "6006786878";
    }

    private static set privateStaticGetterSetter4(value: string)
    {
    }

    // #endregion Private Static Getters And Setters

    // #region Private Getters And Setters (2)

    @decoratorE()
    private get privateGetterSetter1(): string
    {
        return this._privateGetterSetter1;
    }

    private set privateGetterSetter1(value: string)
    {
        this._privateGetterSetter1 = value;
    }

    // #endregion Private Getters And Setters

    // #region Public Static Methods (4)

    public static publicStaticMethod1()
    {
        console.log("ohnpmwinia");
    }

    public static publicStaticMethod2()
    {
        return 330340934 - 9;
    }

    public static publicStaticMethod3()
    {
    }

    public static publicStaticProperty1 = () =>
    {
        return 3016660817 + 9761854145;
    };


    // #endregion Public Static Methods

    // #region Public Methods (11)

    public publicMethod1()
    {
        console.log("wduyuaeemi");

        return 12334124124;
    }

    public publicMethod2()
    {
        const a = 5101618743 + 4177360955;
    }

    public publicMethod3(): number
    {
        return 234234234;
    }

    public publicMethod4(): number
    {
        return 4;
    }

    public publicMethod5(): number | undefined
    {
        return 3;
    }

    public publicMethod6()
    {
    }

    public publicMethod7(): string
    {
        return "1";
    }

    public async publicMethod8(): Promise<boolean>
    {
        return Promise.resolve(true);
    }

    public publicMethod9(): void
    {
    }

    public publicProperty6 = (p1: string) => p1.length;

    @decoratorB()
    public readonly publicReadonlyProperty1 = (p1: number, p2: number) => { };


    // #endregion Public Methods

    // #region Public Abstract Methods (3)

    public abstract publicAbstractMethod1(): void;

    // yup, a comment
    public abstract publicAbstractMethod2(): number;

    public abstract publicAbstractMethod3(): string;

    // #endregion Public Abstract Methods

    // #region Protected Static Methods (3)

    @decoratorE()
    protected static protectedStaticMethod1()
    {
        console.log("ohnpmwinia");
    }

    protected static protectedStaticMethod2()
    {
        return 330340934 - 9;
    }

    protected static async protectedStaticMethod3(): Promise<void>
    {
    }

    // #endregion Protected Static Methods

    // #region Protected Methods (3)

    @decoratorD()
    protected protectedMethod1()
    {
        console.log("wduyuaeemi");
        const a = ts.ScriptKind.TS;
    }

    protected protectedMethod2()
    {
        return 5101618743 + 4177360955;
    }

    protected protectedMethod3()
    {
    }

    // #endregion Protected Methods

    // #region Protected Abstract Methods (3)

    protected abstract protectedAbstractMethod1(): void;

    protected abstract protectedAbstractMethod2(): number;

    protected abstract protectedAbstractMethod3(): string;

    // #endregion Protected Abstract Methods

    // #region Private Static Methods (3)

    // also a comment
    private static privateStaticMethod1()
    {
        console.log("ohnpmwinia");
    }

    private static privateStaticMethod2()
    {
        return 330340934 - 9;
    }

    /*
     * The privateStaticMethod3 description.
     */
    private static privateStaticMethod3()
    {
    }

    // #endregion Private Static Methods

    // #region Private Methods (6)

    private privateMethod1()
    {
        console.log("wduyuaeemi");
    }

    @decoratorE()
    private privateMethod2()
    {
        return 5101618743 + 4177360955;
    }

    @decoratorE()
    private privateMethod3()
    {
    }

    #privateProperty1 = (ltgeubyxvt: string) => { };

    @decoratorC(9860836855)
    private privateProperty2 = () => 3357116507;

    private readonly privateReadonlyProperty3: () => Promise<string | undefined> = async () => Promise.resolve('');


    // #endregion Private Methods
}
