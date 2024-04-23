export abstract class TestClass
{
    private static readonly address = "Lane 1";
    private static readonly city: string | undefined = "City X";

    private readonly name: string | undefined = "The Name";
    private readonly state: String = "Town B";
    private readonly town = "Town A";

    private static isMissing: boolean;

    private arrowFunction = () => 3;
    private lambdaFunction = (name: string) => { };
    private lastName = "Last Name 1";
    private surname: string;

    protected static readonly caption = "The Caption";

    protected readonly level = "Level 1";

    protected static lastName = "Last name 2";

    protected brand = "Brand C";
    protected phoneNumber: Number = 123;

    public static readonly countryCode: Number = 123;

    public readonly color = "Red";

    public static year: Number;

    public areaCode: Number = 123;
    public maker: string | null;
    tone = "dark";

    static {
        TestClass.year = 42;
        this.isMissing = true;
    }

    constructor(private readonly description: string)
    {
        this.maker = "2";
        this.surname = "borg";
    }

    static accessor isLast: boolean | undefined;

    protected accessor isFirst = true;

    private accessor isEnabled: boolean = true;
    private accessor isLast: boolean | undefined;

    public static get getter1(): Number
    {
        return 2;
    }

    public static get setter1(): Number
    {
        return 2;
    }

    get size(): Number
    {
        return 2;
    }

    set size(size: Number) { }

    abstract set height(size: Number);
    abstract get width(): Number;

    static calculate() { }

    /**
     * This method resolves everything.
     */
    static resolve() { }

    public end() { }

    public ping(): number
    {
        return 2;
    }

    async run()
    {
        return Promise.resolve();
    }

    start() { }

    public abstract do(): number;
    abstract measure(): number;

    protected abstract hack(): number;
}
