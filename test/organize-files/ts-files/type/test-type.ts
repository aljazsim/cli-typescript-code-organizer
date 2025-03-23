/*
 * Description of TestType.
 */
export type TestType = {

    /**
     * Method documentation.
     */
    method3(): void;

    property3: string;
    // comment
    property1: string | null;
    /*
    * Property documentation
    */
    property6: (p1: number) => number;
    // comment
    property2: (date: Date) => Promise<Date>;

    method2(): void;

    property7: number | undefined;
    /**
     * Comment!
     */
    [index: string]: any; // trailing comment
    /**
     * Property documentation
     * @returns a value
     */
    property4: () => void;

    // comment
    method1(): void;



    property5: any;
    //
    //
    //
    // a very long comment
    //
    //
    //
    property9: Date;
    // comment
    [index: number]: any;


    property8: number;


};                       // bla bla
