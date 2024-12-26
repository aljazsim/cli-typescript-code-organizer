/*
 * Description of TestType.
 */
export type TestType = {
    // #region Properties

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

    // #region Indexes

    [index: string]: any;
    [index: number]: any;

    // #endregion Indexes

    // #region Methods

    // comment
    property2: (date: Date) => Promise<Date>;
    property4: () => void;
    /*
    * Description of property4.
    */
    property6: (p1: number) => number;

    // #endregion Methods
};
