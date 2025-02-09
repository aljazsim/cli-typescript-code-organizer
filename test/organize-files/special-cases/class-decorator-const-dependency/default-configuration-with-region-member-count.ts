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
    // #region Properties (2)

    private p1 = "";
    private p2 = 12;

    // #endregion
}

const p1 = "";
let p2 = 12;
