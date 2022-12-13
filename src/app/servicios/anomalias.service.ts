import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpMetodosService } from './http-metodos.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AnomaliasService {

  constructor(public http:HttpClient, public metodos: HttpMetodosService) {
       
   }
  
   getAnomalias(token:string){
     
     return this.metodos.get(environment.endpoint.anomaly, token);
   }
   
}
