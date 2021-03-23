import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: 'home', loadChildren: () => import('./homeview/homeview.module').then
      (mod => mod.HomeviewModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
