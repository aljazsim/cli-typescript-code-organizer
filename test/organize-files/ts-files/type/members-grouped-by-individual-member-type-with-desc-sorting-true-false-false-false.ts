/*
 * Description of TestType.
 */
export type TestType = {
// #region Properties

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
    * Description of property4.
    */
    property6: (p1: number) => number;
    property5: any;
    property4: () => void;
    property3: string;
    // comment
    property2: (date: Date) => Promise<Date>;
    property1: string | null;

// #endregion

// #region Indexes

    [index: number]: any;
    [index: string]: any;

// #endregion
};
