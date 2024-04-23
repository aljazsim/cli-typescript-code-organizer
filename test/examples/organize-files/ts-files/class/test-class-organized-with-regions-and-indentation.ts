export abstract class TestClass
{
    // #region Properties

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

    // #endregion

    // #region Static Block Declarations

    static {
        TestClass.year = 42;
        this.isMissing = true;
    }

    // #endregion

    // #region Constructors

    constructor(private readonly description: string)
    {
        this.maker = "2";
        this.surname = "borg";
    }

    // #endregion

    // #region Public Static Accessors

    static accessor isLast: boolean | undefined;

    // #endregion

    // #region Protected Accessors

    protected accessor isFirst = true;

    // #endregion

    // #region Private Accessors

    private accessor isEnabled: boolean = true;
    private accessor isLast: boolean | undefined;

    // #endregion

    // #region Public Static Getters And Setters

    public static get getter1(): Number
    {
        return 2;
    }

    public static get setter1(): Number
    {
        return 2;
    }

    // #endregion

    // #region Public Getters And Setters

    get size(): Number
    {
        return 2;
    }

    set size(size: Number) { }

    // #endregion

    // #region Public Abstract Getters And Setters

    abstract set height(size: Number);
    abstract get width(): Number;

    // #endregion

    // #region Public Static Methods

    static calculate() { }

    /**
     * This method resolves everything.
     */
    static resolve() { }

    // #endregion

    // #region Public Methods

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

    // #endregion

    // #region Public Abstract Methods

    public abstract do(): number;
    abstract measure(): number;

    // #endregion

    // #region Protected Abstract Methods

    protected abstract hack(): number;

    // #endregion
}
