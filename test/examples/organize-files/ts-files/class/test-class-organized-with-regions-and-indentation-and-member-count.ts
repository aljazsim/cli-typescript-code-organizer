export abstract class TestClass
{
    // #region Properties (21)

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

    // #endregion (21)

    // #region Static Block Declarations (1)

    static {
        TestClass.year = 42;
        this.isMissing = true;
    }

    // #endregion (1)

    // #region Constructors (1)

    constructor(private readonly description: string)
    {
        this.maker = "2";
        this.surname = "borg";
    }

    // #endregion (1)

    // #region Public Static Accessors (1)

    static accessor isLast: boolean | undefined;

    // #endregion (1)

    // #region Protected Accessors (1)

    protected accessor isFirst = true;

    // #endregion (1)

    // #region Private Accessors (2)

    private accessor isEnabled: boolean = true;
    private accessor isLast: boolean | undefined;

    // #endregion (2)

    // #region Public Static Getters And Setters (2)

    public static get getter1(): Number
    {
        return 2;
    }

    public static get setter1(): Number
    {
        return 2;
    }

    // #endregion (2)

    // #region Public Getters And Setters (2)

    get size(): Number
    {
        return 2;
    }

    set size(size: Number) { }

    // #endregion (2)

    // #region Public Abstract Getters And Setters (2)

    abstract set height(size: Number);
    abstract get width(): Number;

    // #endregion (2)

    // #region Public Static Methods (2)

    static calculate() { }

    /**
     * This method resolves everything.
     */
    static resolve() { }

    // #endregion (2)

    // #region Public Methods (4)

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

    // #endregion (4)

    // #region Public Abstract Methods (2)

    public abstract do(): number;
    abstract measure(): number;

    // #endregion (2)

    // #region Protected Abstract Methods (1)

    protected abstract hack(): number;

    // #endregion (1)
}
