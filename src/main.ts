import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component,OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  // @Component({
  //   template: ''
  // })
  
  //   export class Demo implements OnInit{

  //   constructor(private router: Router) { }
  
  //   ngOnInit(): void {

  //     // this.router.navigate(['../login/userlogin']);

  //     this.router.navigate(['/','login']);
  //   }
  
  // }
