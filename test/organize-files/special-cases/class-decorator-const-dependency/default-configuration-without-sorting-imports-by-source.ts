import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SalesRoutingModule
{
    private p1 = "";
    private p2 = 12;
}

const p1 = "";
let p2 = 12;
