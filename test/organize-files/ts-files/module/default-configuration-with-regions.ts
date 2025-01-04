// #region Interfaces

export interface ExportedInterface1 { }

export interface ExportedInterface2 { }

export interface ExportedInterface3 { }

export interface ExportedInterface4 { }

export interface ExportedInterface5 { }

interface Interface1 {
 // #region Properties

 property1: string;

 // #endregion

 // #region Methods

 method1(): string

 // #endregion
}

interface Interface2 { }

interface Interface3 { }

interface Interface4 { }

interface Interface5 { }

// #endregion

// #region Classes

class Class1 { }

class Class2 {
 // #region Properties

 public property1: string | null = null;

 // #endregion
}

class Class3 { }

class Class4 { }

class Class5 { }

export class ExportedClass1 {
 // #region Public Methods

 public method2() { }

 // #endregion
}

export class ExportedClass2 { }

export class ExportedClass3 { }

export class ExportedClass4 { }

export class ExportedClass5 { }

// #endregion

// #region Types

export type ExportedType1 = {};

export type ExportedType2 = {};

export type ExportedType3 = {};

export type ExportedType4 = {};

export type ExportedType5 = {};

type Type1 = {
 // #region Properties

 property1: string

 // #endregion
};

type Type2 = {
 // #region Methods

 method1(): void;
 method2(): number;

 // #endregion
};

type Type3 = {};

type Type4 = {};

type Type5 = {};

// #endregion

// #region Functions

function function1() { }

function function2() { }

function function3() { }

function function4() { }

function function5() { }

// #endregion

// #region Exported Functions

export function exportedFunction1() { }

export function exportedFunction2() { }

export function exportedFunction3() { }

export function exportedFunction4() { }

export function exportedFunction5() { }

// #endregion

// #region Variables

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

// #endregion
