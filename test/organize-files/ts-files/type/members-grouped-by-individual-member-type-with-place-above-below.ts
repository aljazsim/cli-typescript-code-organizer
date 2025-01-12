/*
 * Description of TestType.
 */
export type TestType = {
    property8: number;
    property7: number | undefined;

    // comment
    property1: string | null;

    // comment
    property2: (date: Date) => Promise<Date>;
    property3: string;

    /**
     * Property documentation
     * @returns a value
     */
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

    /*
    * Property documentation
    */
    property6: (p1: number) => number;

    /**
     * Comment!
     */
    [index: string]: any;

    // comment
    [index: number]: any;

    /**
     * Method documentation.
     */
    method3(): void;
    method2(): void;

    // comment
    method1(): void;
};
