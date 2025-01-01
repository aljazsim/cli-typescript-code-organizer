/*
 * Description of TestType.
 */
export type TestType = {
    property3: string;
    property1: string | null;
    /*
    * Description of property4.
    */
    property6: (p1: number) => number;
    // comment
    property2: (date: Date) => Promise<Date>;
    property7: number | undefined;
    property4: () => void;
    property5: any;
    //
    //
    //
    // a very long comment
    //
    //
    //
    property9: Date;
    property8: number;

    [index: string]: any;
    [index: number]: any;

    method3(): void;
    method2(): void;
    method1(): void;
};
