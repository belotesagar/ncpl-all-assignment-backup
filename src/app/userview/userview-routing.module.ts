import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustloginComponent} from './custlogin/custlogin.component';
const routes: Routes = [
  
  {path:'custLogin',component:CustloginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserviewRoutingModule { }
