import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IReading } from '../interfaces';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss'],
})
export class ReportePage implements OnInit {
  currentReading:any;

  constructor(private actRoute : ActivatedRoute) { }
  option={
    slidesPerView:1.5,
    centeredSlides: true,
    loop:true,
    spaceBetween:10,
   
  }
  ngOnInit() {
    this.currentReading = JSON.parse(this.actRoute.snapshot.paramMap.get('id'));
    console.log(this.currentReading);
  }
  
}
