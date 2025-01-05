// #region Interfaces (10)

export interface ExportedInterface1 { }

export interface ExportedInterface2 { }

export interface ExportedInterface3 { }

export interface ExportedInterface4 { }

export interface ExportedInterface5 { }

interface Interface1 {
 // #region Properties and indexes (1)

 property1: string;

 // #endregion Properties and indexes

 // #region Methods, getter and setters (1)

 method1(): string

 // #endregion Methods, getter and setters
}

interface Interface2 { }

interface Interface3 { }

interface Interface4 { }

interface Interface5 { }

// #endregion Interfaces

// #region Classes (10)

class Class1 { }

class Class2 {
 // #region Properties (1)

 public property1: string | null = null;

 // #endregion Properties
}

class Class3 { }

class Class4 { }

class Class5 { }

export class ExportedClass1 {
 // #region Methods (1)

 public method2() { }

 // #endregion Methods
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
 // #region Properties, indexes and methods (1)

 property1: string

 // #endregion Properties, indexes and methods
};

type Type2 = {
 // #region Properties, indexes and methods (2)

 method1(): void;
 method2(): number;

 // #endregion Properties, indexes and methods
};

type Type3 = {};

type Type4 = {};

type Type5 = {};

// #endregion Types

// #region Functions (10)

function function1() { }

function function2() { }

function function3() { }

function function4() { }

function function5() { }

export function exportedFunction1() { }

export function exportedFunction2() { }

export function exportedFunction3() { }

export function exportedFunction4() { }

export function exportedFunction5() { }

// #endregion Functions

// #region Variables (20)

const const1 = 1;
const const2 = 2;
const const3 = 3;
const const4 = 4;
const const5 = 5;

let variable1 = null;
let variable2 = null;
let variable3 = null;
let variable4 = null;
let variable5 = null;

export const exportedConst1 = 1;
export const exportedConst2 = 2;
export const exportedConst3 = 3;
export const exportedConst4 = 4;
export const exportedConst5 = 5;

export let exportedVariable1 = null;
export let exportedVariable2 = null;
export let exportedVariable3 = null;
export let exportedVariable4 = null;
export let exportedVariable5 = null;

// #endregion Variables
