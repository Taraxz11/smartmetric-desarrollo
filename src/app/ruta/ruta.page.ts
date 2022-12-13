import { Component, OnInit } from '@angular/core';
import { validValue } from '../functions';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.page.html',
  styleUrls: ['./ruta.page.scss'],
})
export class RutaPage implements OnInit {

  storage = {
    lotes :JSON.parse(localStorage.getItem('route')),
    employee :JSON.parse(localStorage.getItem('employee'))
  }

  lotes;
  employee;

  constructor() { }

  ngOnInit() {
    if(validValue(this.storage.lotes) != false){
      this.lotes= this.storage.lotes;
      }
      if(validValue(this.storage.employee) != false){
        this.employee= this.storage.employee;
        }
  }


  

}
