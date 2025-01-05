/*
 * Description of TestType.
 */
export type TestType = {
    //
    //
    //
    // a very long comment
    //
    //
    //
    property9: Date;
    property8: number;
    property7: number | undefined;
    /*
    * Property documentation
    */
    property6: (p1: number) => number;
    property5: any;
    /**
     * Property documentation
     * @returns a value
     */
    property4: () => void;
    property3: string;
    // comment
    property2: (date: Date) => Promise<Date>;
    property1: string | null;

    [index: number]: any;
    [index: string]: any;

    /**
     * Method documentation.
     */
    method3(): void;
    method2(): void;
    method1(): void;
};
