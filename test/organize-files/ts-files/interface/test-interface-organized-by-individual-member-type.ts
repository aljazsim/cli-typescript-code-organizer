export interface TestInterface
{
    // #region Public ReadOnly Properties (9)

    readonly publicReadonlyProperty1: string;
    readonly publicReadonlyProperty2: string | undefined;
    readonly publicReadonlyProperty3: String;
    readonly publicReadonlyProperty4: string;
    readonly publicReadonlyProperty5: string;
    readonly publicReadonlyProperty6: string | undefined;
    readonly publicReadonlyProperty7: string;
    readonly publicReadonlyProperty8: Number;
    readonly publicReadonlyProperty9: string;

    // #endregion Public ReadOnly Properties (9)

    // #region Public Properties (9)

    publicProperty1: any;
    publicProperty2: string;
    publicProperty3: string | undefined;
    publicProperty4: string;
    publicProperty5: Number;
    publicProperty6: () => number;
    publicProperty7: string;
    publicProperty8: boolean;
    publicProperty9: string | null;

    // #endregion Public Properties (9)

    // #region Public Static Indexers (1)

    [key: string]: any;

    // #endregion Public Static Indexers (1)

    // #region Public Indexers (1)

    [key: string]: any;

    // #endregion Public Indexers (1)

    // #region Public Getters And Setters (6)

    get accessor1(): string;
    get publicGetterSetter1(): Number;
    set publicGetterSetter1(size: Number);
    get publicGetterSetter2(): Number;
    set publicGetterSetter3(size: Number);
    get publicGetterSetter4(): any;

    // #endregion Public Getters And Setters (6)

    // #region Public Methods (9)

    publicMethod1(): number;
    publicMethod2(): void;
    publicMethod3(): number;
    publicMethod4(): number;
    publicMethod5(): number | undefined;
    publicMethod6(): any;
    publicMethod7(): string;
    publicMethod8(): Promise<boolean>;
    publicMethod9(): void;

    // #endregion Public Methods (9)
}