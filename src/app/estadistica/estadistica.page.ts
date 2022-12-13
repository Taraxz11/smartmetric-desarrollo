import { Component, OnInit } from '@angular/core';
import { validValue } from '../functions';
@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.page.html',
  styleUrls: ['./estadistica.page.scss'],
})
export class EstadisticaPage implements OnInit {
  
  storage ={
    incomplete: JSON.parse(localStorage.getItem('products')) ,
    completed : JSON.parse(localStorage.getItem('completed')),
    readings : JSON.parse(localStorage.getItem('readings')),
    stats: JSON.parse(localStorage.getItem('stats')),
    employee: JSON.parse(localStorage.getItem('employee'))
  }
  incomplete = [];
  completed = [];
  readings = [];
  liters;
  employee;
  stats = new Object();

  constructor() { }
   
  ngOnInit() {

    console.log()
    if(validValue(this.storage.incomplete)!= false){
      this.incomplete= this.storage.incomplete;
      }
    if(validValue(this.storage.completed)!= false){
        this.completed= this.storage.completed;
      }
      if(validValue(this.storage.completed) != false){
        this.readings= this.storage.readings;
      }      
    if(validValue(this.storage.stats)!=false){
      this.liters = this.storage.stats
    }  
    if(validValue(this.storage.employee)!=false){
      this.employee = this.storage.employee
    }
    let productsCount = this.incomplete.length + this.completed.length
  
    this.stats = {
    name: this.employee.id,
    route : productsCount,
    incomplete: this.incomplete.length,
    complete :this.completed.length,
    anomalies : this.anomalies(),
    lastMonth : this.liters.current_reading,
    currentMonth : this.liters.last_reading
    }
  }
  anomalies(){
    let anomalies=0;
    
    for(let reading of this.readings){
       
      anomalies += reading.anomaly.length
    }

    return anomalies;
  }
}
