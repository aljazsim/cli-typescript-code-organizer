/*
 * Description of TestType.
 */
export type TestType = {
    // #region Properties

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

    // #endregion Properties

    // #region Indexes

    [index: string]: any;
    [index: number]: any;

    // #endregion Indexes
};
