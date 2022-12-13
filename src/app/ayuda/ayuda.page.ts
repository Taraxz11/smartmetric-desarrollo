import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {

  constructor(private http: HttpClient) { }
  help;
  ngOnInit() {
   this.getHelp().subscribe( 
    res =>{ 
    this.help = res;
    console.log(this.help)       
  });
  }
  getHelp(){
    return this.http.get("assets/files/help.json")
    .pipe( 
      map((res : any) => {return res.help;})
         )    
  }

}
