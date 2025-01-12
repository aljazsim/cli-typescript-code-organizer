/*
 * Description of TestType.
 */
export type TestType = {
    property3: string;

    // comment
    property1: string | null;

    /*
    * Property documentation
    */
    property6: (p1: number) => number;

    // comment
    property2: (date: Date) => Promise<Date>;
    property7: number | undefined;

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
    property8: number;

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
