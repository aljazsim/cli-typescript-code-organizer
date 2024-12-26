export interface TestInterface
{
    // #region Properties

    readonly publicReadonlyProperty2: string | undefined;
    readonly publicReadonlyProperty3: String;
    readonly publicReadonlyProperty4: string;
    readonly publicReadonlyProperty5: string;
    readonly publicReadonlyProperty6: string | undefined;
    readonly publicReadonlyProperty7: string;
    readonly publicReadonlyProperty8: Number;
    readonly publicReadonlyProperty9: string;

    publicProperty1: string;
    publicProperty2: string;
    publicProperty3: string | undefined;
    publicProperty4: string;
    publicProperty5: Number;
    publicProperty7: string;
    publicProperty8: boolean;
    publicProperty9: string | null;

    // #endregion Properties

    // #region Indexes

    [key: string]: any;

    // #endregion Indexes

    // #region Getters And Setters

    get accessor1(): string;

    get publicGetterSetter1(): Number;

    set publicGetterSetter1(size: Number);

    get publicGetterSetter2(): Number;

    set publicGetterSetter3(size: Number);

    get publicGetterSetter4(): any;

    // #endregion Getters And Setters

    // #region Methods

    publicMethod1(): number;
    publicMethod2(): void;
    publicMethod3(): number;
    publicMethod4(): number;
    publicMethod5(): number | undefined;
    publicMethod6(): any;
    publicMethod7(): string;
    publicMethod8(): Promise<boolean>;
    publicMethod9(): void;
    publicProperty6: (p1: string) => number;
    readonly publicReadonlyProperty1: (p1: number, p2: number) => void;

    // #endregion Methods
}
