import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationComponent } from './organization/organization.component';
import { CalenderComponent } from './calender/calender.component';
import { MessagingComponent } from './messaging/messaging.component';
import { TicketComponent } from './ticket/ticket.component';
import {DefaultHomeComponent} from './default-home/default-home.component'

const routes: Routes = [
  {
    path: 'DefaultHome',
    component: DefaultHomeComponent, 
      children: [
      {
        path: 'Calender',component: CalenderComponent, 
      },
      {
        path: 'Messaging',
        component: MessagingComponent, 
      },
      {
        path: 'Ticket',component: TicketComponent, 
      },
      {
        path: 'Organization',
        component: OrganizationComponent, 
      },
      {
        path: '',
        component: OrganizationComponent,
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  
  exports: [RouterModule]
})
export class HomeviewRoutingModule { }
