/*
 * Description of TestType.
 */
export type TestType = {
    // #region Properties (6)

    // comment
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

    // #endregion Properties

    // #region Indexes (2)

    /**
     * Comment!
     */
    [index: string]: any; // trailing comment

    // comment
    [index: number]: any;

    // #endregion Indexes

    // #region Methods (6)

    // comment
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

    // #endregion Methods
}; // bla bla
