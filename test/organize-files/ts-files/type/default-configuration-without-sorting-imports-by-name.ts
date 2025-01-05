/*
 * Description of TestType.
 */
export type TestType = {
    property1: string | null;
    property3: string;
    property5: any;
    property7: number | undefined;
    property8: number;

    //
    //
    //
    // a very long comment
    //
    //
    //
    property9: Date;

    [index: string]: any;
    [index: number]: any;

    method1(): void;
    method2(): void;

    /**
     * Method documentation.
     */
    method3(): void;

    // comment
    property2: (date: Date) => Promise<Date>;

    /**
     * Property documentation
     * @returns a value
     */
    property4: () => void;

    /*
    * Property documentation
    */
    property6: (p1: number) => number;
};
