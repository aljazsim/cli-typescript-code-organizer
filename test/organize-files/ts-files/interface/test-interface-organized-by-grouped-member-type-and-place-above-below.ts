export interface TestInterface
{
    // #region Properties (18)

    readonly publicReadonlyProperty1: string;
    readonly publicReadonlyProperty2: string | undefined;
    readonly publicReadonlyProperty3: String;
    readonly publicReadonlyProperty4: string;
    readonly publicReadonlyProperty5: string;
    readonly publicReadonlyProperty6: string | undefined;
    readonly publicReadonlyProperty7: string;
    readonly publicReadonlyProperty8: Number;
    readonly publicReadonlyProperty9: string;

    publicProperty2: string;
    publicProperty3: string | undefined;
    publicProperty4: string;
    publicProperty5: Number;
    publicProperty6: () => number;
    publicProperty7: string;
    publicProperty8: boolean;
    publicProperty9: string | null;
    publicProperty1: any;

    // #endregion Properties (18)

    // #region Indexers (2)

    [key: string]: any;

    [key: string]: any;

    // #endregion Indexers (2)

    // #region Getters And Setters (6)

    get accessor1(): string;
    get publicGetterSetter1(): Number;
    set publicGetterSetter1(size: Number);
    get publicGetterSetter2(): Number;
    set publicGetterSetter3(size: Number);
    get publicGetterSetter4(): any;

    // #endregion Getters And Setters (6)

    // #region Methods (9)

    publicMethod1(): number;
    publicMethod2(): void;
    publicMethod3(): number;
    publicMethod4(): number;
    publicMethod5(): number | undefined;
    publicMethod6(): any;
    publicMethod7(): string;
    publicMethod8(): Promise<boolean>;
    publicMethod9(): void;

    // #endregion Methods (9)
}