export class MyClass {
    // #region Public Getters And Setters (1)

    public get [Symbol.toStringTag]() {
        return 'MyClass';
    }

    // #endregion
}
