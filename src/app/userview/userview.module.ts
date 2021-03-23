import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserviewRoutingModule } from './userview-routing.module';
import { CustloginComponent } from './custlogin/custlogin.component';
import {ReactiveFormsModule} from '@angular/forms'

@NgModule({
  declarations: [CustloginComponent],
  imports: [
    CommonModule,
    UserviewRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserviewModule { }
