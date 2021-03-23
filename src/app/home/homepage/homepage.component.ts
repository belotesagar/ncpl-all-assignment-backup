import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  showSideBar=false;

  showSideNav(){
    this.showSideBar=true;

  }
  loadOrganization(){
    console.log('organization button clicked');
    this.router.navigate(['Tickettest']);
  }
  // this.router.navigate(['organization']);
}
