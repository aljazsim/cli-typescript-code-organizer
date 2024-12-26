import { decoratorA, decoratorB, decoratorC, decoratorD, decoratorE } from "../test-decorators";

export abstract class TestClass
{
    // this is a comment
    private static readonly privateStaticReadonlyProperty1 = "nt4r2igy03";
    // also a comment
    private static readonly privateStaticReadonlyProperty2: string | undefined = "ckrxombx0g";

    @decoratorC(7960805480)
    private readonly privateReadonlyProperty1: string | undefined = "ohqx31vc3a";
    private readonly privateReadonlyProperty2 = "jwm4jkf16m";
    private readonly privateReadonlyProperty3: () => Promise<string | undefined> = async () => Promise.resolve('');
    @decoratorC(7573192855)
    private readonly privateReadonlyProperty4: String = "709w42symh";

    private static _privateStaticGetterSetter1: string;
    private static _privateStaticGetterSetter2: string;
    private static _protectedStaticGetterSetter1: string;
    private static _protectedStaticGetterSetter2: string;
    private static _publicStaticGetterSetter1: string;
    private static _publicStaticGetterSetter2: string;
    private static privateStaticProperty1: boolean;
    private static privateStaticProperty2 = new Date();

    private _privateGetterSetter1: string = "";
    private _protectedGetterSetter1: string = "";
    private _publicGetterSetter1: string = "";
    @decoratorB()
    private privateProperty1 = "1jznbqo1ck";
    #privateProperty1 = (ltgeubyxvt: string) => { };
    @decoratorC(9860836855)
    private privateProperty2 = () => 3357116507;
    #privateProperty2: string;
    private privateProperty3 = async function () { return Promise.resolve(''); };

    protected static readonly protectedStaticReadonlyProperty1 = "cc7r9dr3zj";
    /*
     * This is documentation.
     */
    @decoratorB()
    protected static readonly protectedStaticReadonlyProperty2 = "oyasnkxrza";

    protected readonly protectedReadonlyProperty1 = "tbgokvjelv";
    protected abstract readonly protectedReadonlyProperty2: string;
    @decoratorA("dozslltkqe")
    @decoratorC(2939536033)
    protected readonly protectedReadonlyProperty3 = 1187372274;
    protected readonly protectedReadonlyProperty4 = 6494372165;
    @decoratorB()
    protected readonly protectedReadonlyProperty5 = 4089519931;
    protected readonly protectedReadonlyProperty6 = 4099945367;

    @decoratorC(9860836855)
    protected static protectedStaticProperty1 = 8522782648;
    protected static protectedStaticProperty2 = "hyc8khk2oj";

    protected protectedProperty1 = "jwm4jkf16m";
    protected protectedProperty2: Number = 9777108868;

    @decoratorB()
    public static readonly publicStaticReadonlyProperty1: Number = 8345836946;
    public static readonly publicStaticReadonlyProperty2: string;
    @decoratorB()
    public static readonly publicStaticReadonlyProperty3: Number;

    @decoratorB()
    public readonly publicReadonlyProperty1 = "ztrfjcvmrm";
    public readonly publicReadonlyProperty2 = "uialqi4dkc";

    public static publicStaticProperty1 = () =>
    {
        return 3016660817 + 9761854145;
    };
    public static publicStaticProperty2: Number;

    public publicProperty1: string | null;
    @decoratorA("qeyfjngywl")
    public publicProperty2 = "pe2bmn4hgi";
    public publicProperty3: Number = 5502271448;

    static {
        this.protectedStaticProperty1 = 4286562276;
        this.privateStaticProperty1 = true;
    }

    constructor(private readonly name: string)
    {
        this.#privateProperty2 = "xzfkmndzen";
        this.publicProperty1 = name;
    }

    @decoratorD()
    public static accessor publicStaticAccessor1: boolean | undefined;
    public static accessor publicStaticAccessor2: number;
    @decoratorD()
    @decoratorE()
    public static accessor publicStaticAccessor3: boolean | undefined;

    public accessor publicAccessor2: number = 8647818341;
    public accessor publicAccessor3 = 4184534899;

    @decoratorD()
    public abstract accessor publicAbstractAccessor1: string;
    @decoratorD()
    public abstract accessor publicAbstractAccessor2: boolean | undefined;
    @decoratorD()
    public abstract accessor publicAbstractAccessor3: string;
    public abstract accessor publicAbstractAccessor4: boolean | undefined;

    protected static accessor protectedStaticAccessor1: boolean | undefined;
    protected static accessor protectedStaticAccessor2: boolean | undefined;

    @decoratorD()
    protected accessor protectedAccessor1: boolean | undefined;
    @decoratorE()
    @decoratorE()
    protected accessor protectedAccessor2: boolean | undefined;

    protected abstract accessor protectedAbstractAccessor1: boolean | undefined;
    protected abstract accessor protectedAbstractAccessor2: string;
    @decoratorD()
    protected abstract accessor protectedAbstractAccessor3: boolean | undefined;

    private static accessor privateStaticAccessor1: boolean | undefined;
    @decoratorD()
    private static accessor privateStaticAccessor2: string;

    @decoratorD()
    private accessor privateAccessor1: boolean | undefined;
    private accessor privateAccessor2: boolean | undefined;

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

    public abstract get publicAbstractGetterSetter1(): string;

    public abstract set publicAbstractGetterSetter1(value: string);

    public abstract get publicAbstractGetterSetter2(): string;

    public abstract set publicAbstractGetterSetter2(value: string);

    public abstract set publicAbstractGetterSetter3(value: string);

    public abstract get publicAbstractGetterSetter4(): string;

    @decoratorE()
    public get publicGetterSetter1(): string
    {
        return this._publicGetterSetter1;
    }

    public set publicGetterSetter1(value: string)
    {
        this._publicGetterSetter1 = value;
    }

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

    protected abstract get protectedAbstractGetterSetter1(): string;

    protected abstract set protectedAbstractGetterSetter1(value: string);

    protected abstract get protectedAbstractGetterSetter2(): string;

    protected abstract set protectedAbstractGetterSetter2(value: string);

    protected abstract set protectedAbstractGetterSetter3(value: string);

    protected abstract get protectedAbstractGetterSetter4(): string;

    @decoratorE()
    protected get protectedGetterSetter1(): string
    {
        return this._protectedGetterSetter1;
    }

    protected set protectedGetterSetter1(value: string)
    {
        this._protectedGetterSetter1 = value;
    }

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

    @decoratorE()
    private get privateGetterSetter1(): string
    {
        return this._privateGetterSetter1;
    }

    private set privateGetterSetter1(value: string)
    {
        this._privateGetterSetter1 = value;
    }

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

    public abstract publicAbstractMethod1(): void;

    // yup, a comment
    public abstract publicAbstractMethod2(): number;

    public abstract publicAbstractMethod3(): string;

    public publicMethod1()
    {
        console.log("wduyuaeemi");
    }

    public publicMethod2()
    {
        return 5101618743 + 4177360955;
    }

    public publicMethod3(parameter1: string): void
    {
    }

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

    protected abstract protectedAbstractMethod1(): void;

    protected abstract protectedAbstractMethod2(): number;

    protected abstract protectedAbstractMethod3(): string;

    @decoratorD()
    protected protectedMethod1()
    {
        console.log("wduyuaeemi");
    }

    protected protectedMethod2()
    {
        return 5101618743 + 4177360955;
    }

    protected protectedMethod3()
    {
    }

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
}
