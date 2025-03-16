export class MyClass {
    // #region Getters And Setters (1)

    public get [Symbol.toStringTag]() {
        return 'MyClass';
    }

    // #endregion Getters And Setters
}
