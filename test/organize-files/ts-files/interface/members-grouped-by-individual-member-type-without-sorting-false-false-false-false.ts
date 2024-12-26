export interface TestInterface
{
    readonly publicReadonlyProperty3: String;
    readonly publicReadonlyProperty5: string;
    readonly publicReadonlyProperty6: string | undefined;
    readonly publicReadonlyProperty7: string;
    readonly publicReadonlyProperty4: string;
    readonly publicReadonlyProperty9: string;
    readonly publicReadonlyProperty2: string | undefined;
    readonly publicReadonlyProperty8: Number;
    readonly publicReadonlyProperty1: (p1: number, p2: number) => void;

    publicProperty6: (p1: string) => number;
    publicProperty2: string;
    publicProperty3: string | undefined;
    publicProperty7: string;
    publicProperty9: string | null;
    publicProperty8: boolean;
    publicProperty5: Number;
    publicProperty1: string;
    publicProperty4: string;

    [key: string]: any;

    get publicGetterSetter4(): any;

    get accessor1(): string;

    get publicGetterSetter1(): Number;

    get publicGetterSetter2(): Number;

    set publicGetterSetter3(size: Number);

    set publicGetterSetter1(size: Number);

    publicMethod6(): any;
    publicMethod5(): number | undefined;
    publicMethod7(): string;
    publicMethod4(): number;
    publicMethod3(): number;
    publicMethod1(): number;
    publicMethod2(): void;
    publicMethod9(): void;
    publicMethod8(): Promise<boolean>;
}
