export interface TestInterface
{
    // #region Properties (18)

    readonly publicReadonlyProperty3: String;
    readonly publicReadonlyProperty2: string | undefined;
    readonly publicReadonlyProperty4: string;
    readonly publicReadonlyProperty5: string;
    readonly publicReadonlyProperty6: string | undefined;
    readonly publicReadonlyProperty7: string;
    readonly publicReadonlyProperty8: number;
    readonly publicReadonlyProperty9: string;
    readonly publicReadonlyProperty1: (p1: number, p2: number) => void;

    publicProperty3: string | undefined;
    publicProperty2: string;
    publicProperty4: string;
    publicProperty5: number;
    publicProperty6: (p1: string) => number;

    // a property
    publicProperty7: string;
    publicProperty8: boolean;
    publicProperty9: string | null;
    publicProperty1: string;

    // #endregion Properties

    // #region Indexes (1)

    // an index
    [key: string]: any;

    // #endregion Indexes

    // #region Getters And Setters (9)

    // a getter
    get publicGetter2(): number;

    get publicGetter4(): any;

    get publicGetterSetter1(): number;

    set publicGetterSetter1(size: number);

    set publicSetter1(value: any);

    set publicSetter2(value: any);

    set publicSetter3(value: number);

    // a setter
    set publicSetter4(value: any);

    set publicSetter5(size: number);

    // #endregion Getters And Setters

    // #region Methods (9)

    publicMethod2(): void;
    publicMethod3(): () => number;

    // a method
    publicMethod4(): number;
    publicMethod5(): number | undefined;
    publicMethod6(): any;
    publicMethod7(): string;
    publicMethod8(): Promise<boolean>;
    publicMethod9(): void;
    publicMethod1(): number;

    // #endregion Methods
}
