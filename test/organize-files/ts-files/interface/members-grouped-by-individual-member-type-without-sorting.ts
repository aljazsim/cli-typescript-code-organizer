export interface TestInterface
{
    // #region Properties (18)

    readonly publicReadonlyProperty3: String;
    readonly publicReadonlyProperty4: string;
    readonly publicReadonlyProperty9: string;
    readonly publicReadonlyProperty8: number;
    readonly publicReadonlyProperty2: string | undefined;
    readonly publicReadonlyProperty6: string | undefined;
    readonly publicReadonlyProperty1: (p1: number, p2: number) => void;
    readonly publicReadonlyProperty5: string;
    readonly publicReadonlyProperty7: string;

    publicProperty2: string;
    publicProperty8: boolean;
    publicProperty1: string;
    publicProperty7: string;
    publicProperty3: string | undefined;
    publicProperty5: number;
    publicProperty9: string | null;
    publicProperty6: (p1: string) => number;
    publicProperty4: string;

    // #endregion Properties

    // #region Indexes (1)

    [key: string]: any;

    // #endregion Indexes

    // #region Getters And Setters (9)

    get publicGetter2(): number;

    get publicGetterSetter1(): number;

    get publicGetter4(): any;

    set publicSetter4(value: any);

    set publicGetterSetter1(size: number);

    set publicSetter1(value: any);

    set publicSetter2(value: any);

    set publicSetter3(value: number);

    set publicSetter5(size: number);

    // #endregion Getters And Setters

    // #region Methods (9)

    publicMethod7(): string;
    publicMethod4(): number;
    publicMethod6(): any;
    publicMethod5(): number | undefined;
    publicMethod1(): number;
    publicMethod3(): () => number;
    publicMethod8(): Promise<boolean>;
    publicMethod2(): void;
    publicMethod9(): void;

    // #endregion Methods
}
