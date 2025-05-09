// 
// Test interface
// 
export interface TestInterface
{
    // #region Properties (18)

    readonly publicReadonlyProperty9: string;
    readonly publicReadonlyProperty8: number;
    readonly publicReadonlyProperty7: string;
    readonly publicReadonlyProperty6: string | undefined;
    readonly publicReadonlyProperty5: string;
    readonly publicReadonlyProperty4: string;
    readonly publicReadonlyProperty3: String; // trailing comment
    readonly publicReadonlyProperty2: string | undefined;
    readonly publicReadonlyProperty1: (p1: number, p2: number) => void;

    publicProperty9: string | null;
    publicProperty8: boolean;

    // a property
    publicProperty7: string;
    publicProperty6: (p1: string) => number;
    publicProperty5: number;
    publicProperty4: string;
    publicProperty3: string | undefined;

    /*
     * Leading comment
     */
    publicProperty2: string;
    publicProperty1: string;

    // #endregion Properties

    // #region Indexes (1)

    // an index
    [key: string]: any; // bbb

    // #endregion Indexes

    // #region Getters And Setters (9)

    set publicSetter5(size: number);

    // a setter
    set publicSetter4(value: any);
    set publicSetter3(value: number);
    set publicSetter2(value: any);
    set publicSetter1(value: any);
    set publicGetterSetter1(size: number);
    get publicGetterSetter1(): number;
    get publicGetter4(): any;

    // a getter
    get publicGetter2(): number;

    // #endregion Getters And Setters

    // #region Methods (9)

    publicMethod9(): void;
    publicMethod8(): Promise<boolean>;
    publicMethod7(): string;
    publicMethod6(): any; // aaa
    publicMethod5(): number | undefined;

    // a method
    publicMethod4(): number;
    publicMethod3(): () => number;
    publicMethod2(): void;
    publicMethod1(): number;

    // #endregion Methods
} // interface
