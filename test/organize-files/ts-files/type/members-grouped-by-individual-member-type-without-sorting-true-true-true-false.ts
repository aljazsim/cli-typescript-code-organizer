/*
 * Description of TestType.
 */
export type TestType = {
    // #region Properties (9)

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

    // #endregion (9)

    // #region Indexes (2)

    [index: string]: any;
    [index: number]: any;

    // #endregion (2)
};
