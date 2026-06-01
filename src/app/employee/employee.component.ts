import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
imports: [CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  constructor(private http: HttpClient) { }

  employees: any[] = [];
 employeeName: string = '';

 email: string = '';

 phone: string = '';

 designation: string = '';

 salary: number = 0;

storeId: number = 1; 
employeeId: number = 0;
  ngOnInit() {

  const token = localStorage.getItem('token');
console.log('Token = ', token);
this.http.get<any[]>(
  'https://localhost:7146/api/Employee',
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

    ).subscribe(data => {

      this.employees = data;

      console.log(data);

    });

  }

saveEmployee() {

  const token = localStorage.getItem('token');

  const employee = {
    employeeName: this.employeeName,
    email: this.email,
    phone: this.phone,
    designation: this.designation,
    salary: this.salary,
    storeId: this.storeId
  };

  this.http.post(
    'https://localhost:7146/api/Employee',
    employee,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      responseType: 'text'
    }
  ).subscribe({
    next: () => {
      alert('Employee Added Successfully');
    },
    error: (error) => {
      alert(JSON.stringify(error));
    }
  });

}
editEmployee(emp: any) {

  this.employeeId = emp.employeeId;

  this.employeeName = emp.employeeName;

  this.email = emp.email;

  this.phone = emp.phone;

  this.designation = emp.designation;

  this.salary = emp.salary;

  this.storeId = emp.storeId;

}

updateEmployee() {

  const token = localStorage.getItem('token');

  const employee = {
    employeeId: this.employeeId,
    employeeName: this.employeeName,
    email: this.email,
    phone: this.phone,
    designation: this.designation,
    salary: this.salary,
    storeId: this.storeId
  };

  this.http.put(
    `https://localhost:7146/api/Employee/${this.employeeId}`,
    employee,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      responseType: 'text'
    }
  ).subscribe({
    next: (response) => {
      alert(response);
    },
    error: (error) => {
      alert(JSON.stringify(error));
    }
  });

}
deleteEmployee(id: number) {

  const token = localStorage.getItem('token');

  this.http.delete(
    `https://localhost:7146/api/Employee/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      responseType: 'text'
    }
  ).subscribe({
    next: (response) => {
      alert(response);
    },
    error: (error) => {
      alert(JSON.stringify(error));
    }
  });

}
}


