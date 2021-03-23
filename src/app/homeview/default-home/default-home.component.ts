import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-home',
  templateUrl: './default-home.component.html',
  styleUrls: ['./default-home.component.css']
})
export class DefaultHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['DefaultHome/']);
  }
  showSideBar = false;

  showSideNav() {
    this.showSideBar = true;
  }
  loadOrganization() {
    this.router.navigate(['DefaultHome/Organization']);
  }

  loadCalender() {
    this.router.navigate(['DefaultHome/Calender']);
  }

  loadTicket() {
    this.router.navigate(['DefaultHome/Ticket']);
  }

  loadMessaging() {
    this.router.navigate(['DefaultHome/Messaging']);
  }

}
