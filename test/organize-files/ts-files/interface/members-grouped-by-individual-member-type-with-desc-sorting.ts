export interface TestInterface
{
    // #region Properties (18)

    readonly publicReadonlyProperty9: string;
    readonly publicReadonlyProperty8: Number;
    readonly publicReadonlyProperty7: string;
    readonly publicReadonlyProperty6: string | undefined;
    readonly publicReadonlyProperty5: string;
    readonly publicReadonlyProperty4: string;
    readonly publicReadonlyProperty3: String;
    readonly publicReadonlyProperty2: string | undefined;
    readonly publicReadonlyProperty1: (p1: number, p2: number) => void;

    publicProperty9: string | null;
    publicProperty8: boolean;
    publicProperty7: string;
    publicProperty6: (p1: string) => number;
    publicProperty5: Number;
    publicProperty4: string;
    publicProperty3: string | undefined;
    publicProperty2: string;
    publicProperty1: string;

    // #endregion Properties

    // #region Indexes (1)

    [key: string]: any;

    // #endregion Indexes

    // #region Getters And Setters (6)

    get publicGetterSetter4(): any;

    set publicGetterSetter3(size: Number);

    get publicGetterSetter2(): Number;

    set publicGetterSetter1(size: Number);

    get publicGetterSetter1(): Number;

    get accessor1(): string;

    // #endregion Getters And Setters

    // #region Methods (9)

    publicMethod9(): void;
    publicMethod8(): Promise<boolean>;
    publicMethod7(): string;
    publicMethod6(): any;
    publicMethod5(): number | undefined;
    publicMethod4(): number;
    publicMethod3(): number;
    publicMethod2(): void;
    publicMethod1(): number;

    // #endregion Methods

}
