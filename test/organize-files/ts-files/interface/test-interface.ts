export interface TestInterface
{


    readonly publicReadonlyProperty3: String;

    publicMethod6(): any;

    get publicGetter4(): any;
    readonly publicReadonlyProperty5: string;

    set publicSetter4(value: any);

    publicMethod5(): number | undefined;


    readonly publicReadonlyProperty6: string | undefined;
    publicMethod7(): string;
    set publicSetter1(value: any);
    publicMethod4(): number;
    set publicSetter2(value: any);

    readonly publicReadonlyProperty7: string;
    publicProperty6: (p1: string) => number;

    publicMethod3(): number;
    publicProperty2: string;

    set publicGetter3(size: number);
    set publicSetter3(value: number);
    readonly publicReadonlyProperty4: string;
    get accessor1(): string;
    publicProperty3: string | undefined;
    publicMethod1(): number;


    publicProperty7: string;
    readonly publicReadonlyProperty9: string;
    publicProperty9: string | null;
    [key: string]: any;




    get publicGetter1(): number;

    get publicGetter2(): number;
    readonly publicReadonlyProperty2: string | undefined;

    readonly publicReadonlyProperty8: number;

    readonly publicReadonlyProperty1: (p1: number, p2: number) => void;

    publicMethod2(): void;

    publicMethod9(): void;
    publicProperty8: boolean;

    publicProperty5: number;


    publicProperty1: string;
    publicMethod8(): Promise<boolean>;
    publicProperty4: string;
    set publicGetter1(size: number);
}
