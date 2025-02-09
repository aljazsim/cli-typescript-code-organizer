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
    // #region Properties

    private p1 = "";
    private p2 = 12;

    // #endregion
}
