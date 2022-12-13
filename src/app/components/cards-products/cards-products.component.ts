import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-products',
  templateUrl: './cards-products.component.html',
  styleUrls: ['./cards-products.component.scss'],
})
export class CardsProductsComponent implements OnInit {
@Input()  client : Object;
 date = new Date()
 currentMonth
  constructor() { }

  ngOnInit() {
    let month = {
      0:'Enero',
      1:'Febrero',
      2:'Marzo',
      3:'Abril',
      4:'Mayo',
      5:'Junio',
      6:'Julio',
      7:'Agosto',
      8:'Septiembre',
      9:'Octubre',
      10:'Noviembre',
      11:'Diciembre'
    }
   this.currentMonth = month[this.date.getMonth()]
  }


}
