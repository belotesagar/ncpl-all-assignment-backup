import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    Name: new FormControl('', Validators.required),
    Address: new FormControl('', Validators.required),
    Mobile: new FormControl('', Validators.required),
  })

  get Name() { return this.loginForm.get('Name') }
  get Address() { return this.loginForm.get('Address') }
  get Mobile() { return this.loginForm.get('Mobile') }


  items = [];
  onSubmit() {
    console.log("value", this.loginForm.value);
    this.items.push(this.loginForm.value);
  }
}
