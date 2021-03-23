import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from '../employee-data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  usersData: any = [];
  constructor(private _userService: EmployeeDataService) { }

  ngOnInit(): void { 
    this._userService.getUserData().subscribe(data => {
      console.log("users data:", data);
      this.usersData = data;
    })
  }

}
