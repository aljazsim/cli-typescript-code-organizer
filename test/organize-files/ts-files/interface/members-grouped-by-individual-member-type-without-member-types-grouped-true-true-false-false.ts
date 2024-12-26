// #region Interfaces

export interface TestInterface
{
    // #region Properties

    publicProperty1: string;
    publicProperty2: string;
    publicProperty3: string | undefined;
    publicProperty4: string;
    publicProperty5: Number;
    publicProperty6: (p1: string) => number;
    publicProperty7: string;
    publicProperty8: boolean;
    publicProperty9: string | null;
    readonly publicReadonlyProperty1: (p1: number, p2: number) => void;
    readonly publicReadonlyProperty2: string | undefined;
    readonly publicReadonlyProperty3: String;
    readonly publicReadonlyProperty4: string;
    readonly publicReadonlyProperty5: string;
    readonly publicReadonlyProperty6: string | undefined;
    readonly publicReadonlyProperty7: string;
    readonly publicReadonlyProperty8: Number;
    readonly publicReadonlyProperty9: string;

    // #endregion

    // #region Indexes

    [key: string]: any;

    // #endregion

    // #region Getters And Setters

    get accessor1(): string;

    get publicGetterSetter1(): Number;

    set publicGetterSetter1(size: Number);

    get publicGetterSetter2(): Number;

    set publicGetterSetter3(size: Number);

    get publicGetterSetter4(): any;

    // #endregion

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

    // #endregion
}

// #endregion
