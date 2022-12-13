import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpMetodosService {
  
  constructor(public http:HttpClient) { }

  get(endpoint,token){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'DOLAPIKEY': token
      })
    }
    return this.http.get(environment._url + endpoint , httpOptions).pipe( 
      map((res : any) => {return res}
    ));
   }

  post(endpoint:string, item){       
         let httpOptions = {
           headers: new HttpHeaders({
             'Content-Type': 'application/json',
           })
          }

   return this.http.post(environment._url + endpoint, item, httpOptions ).pipe( 
     map((res : any) => {return res}
   ))
  }
  
  update(endpoint:string, body:any){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
     }
    this.http.put(environment._url, body, httpOptions)
  }

  delete(endpoint:string){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
     }
    this.http.delete(environment._url + endpoint, httpOptions)
  }
}


