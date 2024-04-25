import { decoratorA, decoratorB, decoratorC, decoratorD, decoratorE } from "../../../helpers/test-decorators";

export abstract class TestClass
{
    // #region Private Static ReadOnly Properties (2)

    private static readonly privateStaticReadonlyProperty1 = "nt4r2igy03";
    private static readonly privateStaticReadonlyProperty2: string | undefined = "ckrxombx0g";

    // #endregion Private Static ReadOnly Properties (2)

    // #region Private ReadOnly Properties (3)

    @decoratorC(7960805480)
    private readonly privateReadonlyProperty1: string | undefined = "ohqx31vc3a";
    private readonly privateReadonlyProperty2 = "jwm4jkf16m";
    @decoratorC(7573192855)
    private readonly privateReadonlyProperty3: String = "709w42symh";

    // #endregion Private ReadOnly Properties (3)

    // #region Private Static Properties (4)

    private static _publicStaticGetterSetter1: string;
    private static _publicStaticGetterSetter2: string;
    private static privateStaticProperty1: boolean;
    private static privateStaticProperty2 = new Date();

    // #endregion Private Static Properties (4)

    // #region Private Properties (4)

    #privateProperty1 = (ltgeubyxvt: string) => { };
    #privateProperty2: string;
    @decoratorB()
    private privateProperty1 = "1jznbqo1ck";
    @decoratorC(9860836855)
    private privateProperty2 = () => 3357116507;

    // #endregion Private Properties (4)

    // #region Protected Static ReadOnly Properties (2)

    protected static readonly protectedStaticReadonlyProperty1 = "cc7r9dr3zj";
    @decoratorB()
    protected static readonly protectedStaticReadonlyProperty2 = "oyasnkxrza";

    // #endregion Protected Static ReadOnly Properties (2)

    // #region Protected ReadOnly Properties (6)

    protected readonly protectedReadonlyProperty1 = "tbgokvjelv";
    protected readonly protectedReadonlyProperty2 = "txpobjdpsj";
    @decoratorB()
    @decoratorA("dozslltkqe")
    @decoratorC(2939536033)
    protected readonly protectedReadonlyProperty3 = 1187372274;
    protected readonly protectedReadonlyProperty4 = 6494372165;
    @decoratorB()
    protected readonly protectedReadonlyProperty5 = 4089519931;
    protected readonly protectedReadonlyProperty6 = 4099945367;

    // #endregion Protected ReadOnly Properties (6)

    // #region Protected Static Properties (2)

    @decoratorC(9860836855)
    protected static protectedStaticProperty1 = 8522782648;
    protected static protectedStaticProperty2 = "hyc8khk2oj";

    // #endregion Protected Static Properties (2)

    // #region Protected Properties (2)

    protected protectedProperty1 = "jwm4jkf16m";
    protected protectedProperty2: Number = 9777108868;

    // #endregion Protected Properties (2)

    // #region Public Static ReadOnly Properties (3)

    @decoratorB()
    public static readonly publicStaticReadonlyProperty1: Number = 8345836946;
    public static readonly publicStaticReadonlyProperty2: string;
    @decoratorB()
    public static readonly publicStaticReadonlyProperty3: Number;

    // #endregion Public Static ReadOnly Properties (3)

    // #region Public ReadOnly Properties (2)

    @decoratorB()
    public readonly publicReadonlyProperty1 = "ztrfjcvmrm";
    public readonly publicReadonlyProperty2 = "uialqi4dkc";

    // #endregion Public ReadOnly Properties (2)

    // #region Public Static Properties (2)

    public static publicStaticProperty1 = () =>
    {
        return 3016660817 + 9761854145;
    };
    public static publicStaticProperty2: Number;

    // #endregion Public Static Properties (2)

    // #region Public Properties (3)

    public publicProperty1: string | null;
    @decoratorA("qeyfjngywl")
    public publicProperty2 = "pe2bmn4hgi";
    public publicProperty3: Number = 5502271448;

    // #endregion Public Properties (3)

    // #region Static Block Declarations (1)

    static {
        this.protectedStaticProperty1 = 4286562276;
        this.privateStaticProperty1 = true;
    }

    // #endregion Static Block Declarations (1)

    // #region Constructors (1)

    constructor(private readonly name: string)
    {
        this.#privateProperty2 = "xzfkmndzen";
        this.publicProperty1 = name;
    }

    // #endregion Constructors (1)

    // #region Public Static Accessors (3)

    @decoratorD()
    public static accessor publicStaticAccessor1: boolean | undefined;
    public static accessor publicStaticAccessor2: number;
    @decoratorD()
    @decoratorE()
    public static accessor publicStaticAccessor3: boolean | undefined;

    // #endregion Public Static Accessors (3)

    // #region Public Accessors (3)

    public accessor publicAccessor1: boolean | undefined;
    @decoratorD()
    public accessor publicAccessor2: number = 8647818341;
    @decoratorE()
    public accessor publicAccessor3 = 4184534899;

    // #endregion Public Accessors (3)

    // #region Public Abstract Accessors (4)

    @decoratorE()
    @decoratorD()
    public abstract accessor publicAbstractAccessor1: string;
    @decoratorD()
    public abstract accessor publicAbstractAccessor2: boolean | undefined;
    @decoratorD()
    public abstract accessor publicAbstractAccessor3: string;
    public abstract accessor publicAbstractAccessor4: boolean | undefined;

    // #endregion Public Abstract Accessors (4)

    // #region Protected Static Accessors (2)

    protected static accessor protectedStaticAccessor1: boolean | undefined;
    protected static accessor protectedStaticAccessor2: boolean | undefined;

    // #endregion Protected Static Accessors (2)

    // #region Protected Accessors (2)

    @decoratorD()
    protected accessor protectedAccessor1: boolean | undefined;
    protected accessor protectedAccessor2: boolean | undefined;

    // #endregion Protected Accessors (2)

    // #region Protected Abstract Accessors (3)

    protected abstract accessor protectedAbstractAccessor1: boolean | undefined;
    protected abstract accessor protectedAbstractAccessor2: string;
    @decoratorD()
    protected abstract accessor protectedAbstractAccessor3: boolean | undefined;

    // #endregion Protected Abstract Accessors (3)

    // #region Private Static Accessors (2)

    private static accessor privateStaticAccessor1: boolean | undefined;
    @decoratorD()
    private static accessor privateStaticAccessor2: string;

    // #endregion Private Static Accessors (2)

    // #region Private Accessors (2)

    @decoratorD()
    private accessor privateAccessor1: boolean | undefined;
    private accessor privateAccessor2: boolean | undefined;

    // #endregion Private Accessors (2)

    // #region Public Static Getters And Setters (5)

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

    // #endregion Public Static Getters And Setters (5)
}
