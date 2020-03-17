import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchComponent} from "./components/search/search.component";
import {DetailComponent} from "./components/detail/detail.component";


const routes: Routes = [
  {path:'search', component:SearchComponent},
  {path:'details/:user', component: DetailComponent},
  {path:'**', pathMatch:'full', redirectTo:'search'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
