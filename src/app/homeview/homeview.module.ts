import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeviewRoutingModule } from './homeview-routing.module';
import { DefaultHomeComponent } from './default-home/default-home.component';
import { OrganizationComponent } from './organization/organization.component';
import { CalenderComponent } from './calender/calender.component';
import { TicketComponent } from './ticket/ticket.component';
import { MessagingComponent } from './messaging/messaging.component';
import { ReactiveFormsModule } from '@angular/forms'
import { FormsModule } from '@angular/forms';
import { FirstpipePipe } from './firstpipe.pipe';
@NgModule({
  declarations: [DefaultHomeComponent, OrganizationComponent, CalenderComponent, TicketComponent, MessagingComponent, FirstpipePipe],
  imports: [
    CommonModule,
    HomeviewRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HomeviewModule { }
