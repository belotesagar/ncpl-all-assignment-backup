import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { OrganizationComponent } from './organization/organization.component';
import { HomeRoutingModule } from '../home-routing.module';
import { TickettestComponent } from './homepage/tickettest/tickettest.component';



@NgModule({
  declarations: [HomepageComponent, OrganizationComponent, TickettestComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  exports:[
    HomepageComponent,
    OrganizationComponent,
    TickettestComponent
  ],
  // bootstrap: [HomepageComponent]
})
export class HomeModule { }
