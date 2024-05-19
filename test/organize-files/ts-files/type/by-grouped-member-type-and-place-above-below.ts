/*
 * Description of TestType.
 */
export type TestType = {
    // #region Properties (9)

    property8: number;
    property7: number | undefined;
    property1: string | null;
    // comment
    property2: (date: Date) => Promise<Date>;
    property3: string;
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
    * Description of property4.
    */
    property6: (p1: number) => number;

    // #endregion Properties (9)

    // #region Indexes (2)

    [index: string]: any;
    [index: number]: any;

    // #endregion Indexes (2)
};
