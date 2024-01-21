import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit{
  customers:any;
  
  constructor(private http:HttpClient){
  }
  ngOnInit(): void {
    this.http.get("http://localhost:8090/customers").subscribe({
    next:data=>{
      this.customers=data;
    },
    error:err=>{
      console.log("errore");
    }
    })
  }

}
