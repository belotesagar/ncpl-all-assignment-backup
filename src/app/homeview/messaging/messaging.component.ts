import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  data = [{
    name: "john",
    age: 23
  },
  {
    name: "jack",
    age: 25
  },
  {
    name: "moris",
    age: 45
  },
  {
    name: "elon",
    age: 32
  }
  ]
}
