//
// Test interface
//
export interface TestInterface
{
    readonly publicReadonlyProperty3: String;// trailing comment




    /*
     * Leading comment
     */
    publicProperty2: string;

    // a setter
    set publicSetter4(value: any);




    readonly publicReadonlyProperty4: string;

    readonly publicReadonlyProperty9: string;
    set publicGetterSetter1(size: number);
    publicProperty8: boolean;

    readonly publicReadonlyProperty8: number;
    publicMethod7(): string;

    // a getter
    get publicGetter2(): number;
    publicProperty1: string;

    readonly publicReadonlyProperty2: string | undefined;


    // a property
    publicProperty7: string;

    // a method
    publicMethod4(): number;
    readonly publicReadonlyProperty6: string | undefined;
    publicMethod6(): any; // aaa

    publicProperty3: string | undefined;

    publicProperty5: number;




    publicProperty9: string | null;

    // an index
    [key: string]: any; // bbb
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
} // interface
