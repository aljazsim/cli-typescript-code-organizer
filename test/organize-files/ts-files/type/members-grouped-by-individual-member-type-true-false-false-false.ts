/*
 * Description of TestType.
 */
export type TestType = {
// #region Properties

    property1: string | null;
    // comment
    property2: (date: Date) => Promise<Date>;
    property3: string;
    property4: () => void;
    property5: any;
    /*
    * Description of property4.
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

// #endregion

// #region Indexes

    [index: string]: any;
    [index: number]: any;

// #endregion
};
