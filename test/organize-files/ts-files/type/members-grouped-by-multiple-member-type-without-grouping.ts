/*
 * Description of TestType.
 */
export type TestType = {
    // #region Properties, indexes and methods (14)

    /**
     * Comment!
     */
    [index: string]: any; // trailing comment

    // comment
    [index: number]: any;

    // comment
    method1(): void;
    method2(): void;

    /**
     * Method documentation.
     */
    method3(): void;

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

    /*
    * Property documentation
    */
    property6: (p1: number) => number;
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

    // #endregion Properties, indexes and methods
}; // bla bla
