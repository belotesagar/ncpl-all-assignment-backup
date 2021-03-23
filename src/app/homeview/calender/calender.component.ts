import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  items = [];
  onSubmit(data) {
    console.log("data:", data);
    this.items.push(data);
  }

}
