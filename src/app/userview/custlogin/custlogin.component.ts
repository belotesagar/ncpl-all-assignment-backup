// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-custlogin',
//   templateUrl: './custlogin.component.html',
//   styleUrls: ['./custlogin.component.css']
// })
// export class CustloginComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

// //--------------------------

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-custlogin',
  templateUrl: './custlogin.component.html',
  styleUrls: ['./custlogin.component.css']
})
export class CustloginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    Username: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required)
  })

  get username() { return this.loginForm.get('Username') }
  get password() { return this.loginForm.get('Password') }

  onSubmit() {
    console.log("value", this.loginForm.value);
    this.router.navigate(['home/DefaultHome']);

  }
}

