export interface TestInterface
{
    // #region Properties (18)

    readonly publicReadonlyProperty1: (p1: number, p2: number) => void;
    readonly publicReadonlyProperty2: string | undefined;
    readonly publicReadonlyProperty3: String;
    readonly publicReadonlyProperty4: string;
    readonly publicReadonlyProperty5: string;
    readonly publicReadonlyProperty6: string | undefined;
    readonly publicReadonlyProperty7: string;
    readonly publicReadonlyProperty8: number;
    readonly publicReadonlyProperty9: string;

    publicProperty1: string;
    publicProperty2: string;
    publicProperty3: string | undefined;
    publicProperty4: string;
    publicProperty5: number;
    publicProperty6: (p1: string) => number;
    publicProperty7: string;
    publicProperty8: boolean;
    publicProperty9: string | null;

    // #endregion

    // #region Indexes (1)

    [key: string]: any;

    // #endregion

    // #region Getters And Setters (9)

    get publicGetter2(): number;

    get publicGetter4(): any;

    get publicGetterSetter1(): number;

    set publicGetterSetter1(size: number);

    set publicSetter1(value: any);

    set publicSetter2(value: any);

    set publicSetter3(value: number);

    set publicSetter4(value: any);

    set publicSetter5(size: number);

    // #endregion

    // #region Methods (9)

    publicMethod1(): number;
    publicMethod2(): void;
    publicMethod3(): () => number;
    publicMethod4(): number;
    publicMethod5(): number | undefined;
    publicMethod6(): any;
    publicMethod7(): string;
    publicMethod8(): Promise<boolean>;
    publicMethod9(): void;

    // #endregion
}
