export interface TestInterface
{
    // #region Properties and indexes (19)

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

    [key: string]: any;

    // #endregion Properties and indexes

    // #region Methods, getter and setters (19)

    publicMethod1(): number;
    publicMethod2(): void;
    publicMethod3(): number;
    publicMethod4(): number;
    publicMethod5(): number | undefined;
    publicMethod6(): any;
    publicMethod7(): string;
    publicMethod8(): Promise<boolean>;
    publicMethod9(): void;

    get accessor1(): string;

    get publicGetter1(): number;

    set publicGetter1(size: number);

    get publicGetter2(): number;

    set publicGetter3(size: number);

    get publicGetter4(): any;

    set publicSetter1(value: any);

    set publicSetter2(value: any);

    set publicSetter3(value: number);

    set publicSetter4(value: any);

    // #endregion Methods, getter and setters
}
