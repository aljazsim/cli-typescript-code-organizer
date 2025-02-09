import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SalesRoutingModule
{
    // #region Private Properties (2)

    private p2 = 12;
    private p1 = "";

    // #endregion Private Properties
}

const p1 = "";
let p2 = 12;
