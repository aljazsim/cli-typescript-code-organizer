/*
 * Description of TestType.
 */
export type TestType = {
    property3: string;
    property1: string | null;
    /*
    * Description of property4.
    */
    property6: (p1: number) => number;
    // comment
    property2: (date: Date) => Promise<Date>;


    property7: number | undefined;
    [index: string]: any;
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
    [index: number]: any;
    property8: number;
};
