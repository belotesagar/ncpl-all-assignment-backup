import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from '../employee-data.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeData: any;

  constructor(private _emp: EmployeeDataService) {

  }
  headers = ["userId", "jobTitleName", "firstName", "lastName", "preferredFullName",
    "employeeCode", "region", "phoneNumber", "emailAddress"];

  ngOnInit(): void {
    this.employeeData = this._emp.getEmployeeData();
    console.log("employeeData from service:", this.employeeData);
  }

}
