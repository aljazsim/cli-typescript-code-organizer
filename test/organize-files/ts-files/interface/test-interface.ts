export interface TestInterface
{
    readonly publicReadonlyProperty3: String;




    publicProperty2: string;
    set publicSetter4(value: any);




    readonly publicReadonlyProperty4: string;

    readonly publicReadonlyProperty9: string;
    set publicGetterSetter1(size: number);
    publicProperty8: boolean;

    readonly publicReadonlyProperty8: number;
    publicMethod7(): string;

    get publicGetter2(): number;
    publicProperty1: string;

    readonly publicReadonlyProperty2: string | undefined;


    publicProperty7: string;
    publicMethod4(): number;
    readonly publicReadonlyProperty6: string | undefined;
    publicMethod6(): any;

    publicProperty3: string | undefined;

    publicProperty5: number;




    publicProperty9: string | null;

    [key: string]: any;
    readonly publicReadonlyProperty1: (p1: number, p2: number) => void;
    publicMethod5(): number | undefined;
    get publicGetterSetter1(): number;
    readonly publicReadonlyProperty5: string;
    set publicSetter1(value: any);

    set publicSetter2(value: any);
    publicMethod1(): number;
    publicMethod3(): () => number;
    set publicSetter3(value: number);
    publicMethod8(): Promise<boolean>;
    publicProperty6: (p1: string) => number;
    publicMethod2(): void;

    publicProperty4: string;
    set publicSetter5(size: number);
    readonly publicReadonlyProperty7: string;
    publicMethod9(): void;


    get publicGetter4(): any;
}
