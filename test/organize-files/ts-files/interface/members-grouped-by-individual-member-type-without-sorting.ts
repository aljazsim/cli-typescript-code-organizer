export interface TestInterface
{
    // #region Properties (18)

    readonly publicReadonlyProperty3: String;
    readonly publicReadonlyProperty5: string;
    readonly publicReadonlyProperty6: string | undefined;
    readonly publicReadonlyProperty7: string;
    readonly publicReadonlyProperty4: string;
    readonly publicReadonlyProperty9: string;
    readonly publicReadonlyProperty2: string | undefined;
    readonly publicReadonlyProperty8: number;
    readonly publicReadonlyProperty1: (p1: number, p2: number) => void;

    publicProperty6: (p1: string) => number;
    publicProperty2: string;
    publicProperty3: string | undefined;
    publicProperty7: string;
    publicProperty9: string | null;
    publicProperty8: boolean;
    publicProperty5: number;
    publicProperty1: string;
    publicProperty4: string;

    // #endregion Properties

    // #region Indexes (1)

    [key: string]: any;

    // #endregion Indexes

    // #region Getters And Setters (10)

    get publicGetter4(): any;

    get accessor1(): string;

    get publicGetter1(): number;

    get publicGetter2(): number;

    set publicSetter4(value: any);

    set publicSetter1(value: any);

    set publicSetter2(value: any);

    set publicGetter3(size: number);

    set publicSetter3(value: number);

    set publicGetter1(size: number);

    // #endregion Getters And Setters

    // #region Methods (9)

    publicMethod6(): any;
    publicMethod5(): number | undefined;
    publicMethod7(): string;
    publicMethod4(): number;
    publicMethod3(): number;
    publicMethod1(): number;
    publicMethod2(): void;
    publicMethod9(): void;
    publicMethod8(): Promise<boolean>;

    // #endregion Methods
}
