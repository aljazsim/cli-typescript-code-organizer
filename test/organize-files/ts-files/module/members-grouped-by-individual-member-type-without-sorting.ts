// #region Interfaces (10)

export interface ExportedInterface1 { }

export interface ExportedInterface2 { }

export interface ExportedInterface3 { }

export interface ExportedInterface4 { }

export interface ExportedInterface5 { }

interface Interface1 {
 // #region Properties (1)

 property1: string;

 // #endregion Properties

 // #region Methods (1)

 method1(): string

 // #endregion Methods
}

interface Interface2 { }

interface Interface3 { }

interface Interface4 { }

interface Interface5 { }

// #endregion Interfaces

// #region Classes (10)

class Class1 { }

class Class2 {
 // #region Public Properties (1)

 public property1: string | null = null;

 // #endregion Public Properties
}

class Class3 { }

class Class4 { }

class Class5 { }

export class ExportedClass1 {
 // #region Public Methods (1)

 public method2() { }

 // #endregion Public Methods
}

export class ExportedClass2 { }

export class ExportedClass3 { }

export class ExportedClass4 { }

export class ExportedClass5 { }

// #endregion Classes

// #region Types (10)

export type ExportedType1 = {};

export type ExportedType2 = {};

export type ExportedType3 = {};

export type ExportedType4 = {};

export type ExportedType5 = {};

type Type1 = {
 property1: string
};

type Type2 = {
 method2(): number;
 method1(): void;
};

type Type3 = {};

type Type4 = {};

type Type5 = {};

// #endregion Types

// #region Functions (5)

function function1() { }

function function2() { }

function function3() { }

function function4() { }

function function5() { }

// #endregion Functions

// #region Exported Functions (5)

export function exportedFunction1() { }

export function exportedFunction2() { }

export function exportedFunction3() { }

export function exportedFunction4() { }

export function exportedFunction5() { }

// #endregion Exported Functions

// #region Constants (5)

const const1 = 1;
const const2 = 2;
const const3 = 3;
const const4 = 4;
const const5 = 5;

// #endregion Constants

// #region Variables (5)

let variable1 = null;
let variable2 = null;
let variable3 = null;
let variable4 = null;
let variable5 = null;

// #endregion Variables

// #region Exported Constants (5)

export const exportedConst1 = 1;
export const exportedConst2 = 2;
export const exportedConst3 = 3;
export const exportedConst4 = 4;
export const exportedConst5 = 5;

// #endregion Exported Constants

// #region Exported Variables (5)

export let exportedVariable1 = null;
export let exportedVariable2 = null;
export let exportedVariable3 = null;
export let exportedVariable4 = null;
export let exportedVariable5 = null;

// #endregion Exported Variables
