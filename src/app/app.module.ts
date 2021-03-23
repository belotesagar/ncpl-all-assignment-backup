import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginModule} from './login/login.module';
import {HomeModule } from './home/home.module'
import {HomeviewModule} from './homeview/homeview.module';
import { FirstpipePipe } from './firstpipe.pipe'
@NgModule({
  declarations: [
    AppComponent,
    FirstpipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HomeModule,
    HomeviewModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
