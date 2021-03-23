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
    this.router.navigate(['/homepage/products']);
  }
  // showSideBar = false;

  showSideNav() {
    // this.showSideBar = true;
  }
  loadProducts() {
    this.router.navigate(['/homepage/products']);
  }

  loadInventory() {
    this.router.navigate(['/homepage/inventory']);
  }

  loadCart() {
    this.router.navigate(['/homepage/cart']);
  }

}
