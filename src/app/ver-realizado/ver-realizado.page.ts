import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ver-realizado',
  templateUrl: './ver-realizado.page.html',
  styleUrls: ['./ver-realizado.page.scss'],
})
export class VerRealizadoPage implements OnInit {
  id: string;
  readings  = JSON.parse(localStorage.getItem('readings'));
  completed = JSON.parse(localStorage.getItem('completed'));
  currentReading = new Object();
  option={
    slidesPerView:1.5,
    centeredSlides: true,
    loop:true,
    spaceBetween:10, 
  }
  constructor( private router: Router, private activatedRoute: ActivatedRoute) { }
     
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.currentReading = {
      id: this.id,
      label: this.selected().label,
      address: this.selected().address,
      last_measure:this.selected().last_measure,
      current : this.readingInfo().hydrometer,
      anomalies : this.readingInfo().description,
      date: this.dateSpanish(this.readingInfo().date),
      name:this.selected().client.name,
      images: this.readingInfo().photos
   }
  }
 
  selected(){
    for (let complete of this.completed) {
      
      if(complete.id == this.id){  return complete }
    }
  }
  readingInfo(){
    for (let read of this.readings) {
      
      if(read.product_id == this.id){  return read }
    }
  }
  dateSpanish(fecha:string){
    let date = new Date(fecha) 
    let day = {
      1:'Lunes',
      2:'Martes',
      3:'Miércoles',
      4:'Jueves',
      5:'Viernes',
      6:'Sábado',
      0:'Domingo'
     } 
     let month = {
      1:'Enero',
      2:'Febrero',
      3:'Marzo',
      4:'Abril',
      5:'Mayo',
      6:'Junio',
      7:'Julio',
      8:'Agosto',
      9:'Septiembre',
      10:'Octubre',
      11:'Noviembre',
      12:'Diciembre'
    }
  
    return `${ day[date.getDay()]}, ${date.getDate()} de ${month[date.getMonth()]} del ${date.getFullYear()}` 
  }
  showAnomaly(){
    if(this.readingInfo().description.length == 0){
      return false;
    }
    return true
  }

}
    