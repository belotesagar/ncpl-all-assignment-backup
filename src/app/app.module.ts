import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { rootReducer, IAppState, INITIAL_STATE } from '../store'; // < New
import { CounterActions } from './actions'; // <- New
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgReduxModule,
  ],
  providers: [CounterActions],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>,
    devTools: DevToolsExtension) {

    const storeEnhancers = devTools.isEnabled() ? // <- New
      [devTools.enhancer()] : // <- New
      [];

    ngRedux.configureStore(rootReducer, INITIAL_STATE,
      [], // <- New
      storeEnhancers);
  }
}
