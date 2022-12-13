import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders,HttpErrorResponse} from '@angular/common/http'
import { map } from 'rxjs/operators';
import { HttpMetodosService } from './http-metodos.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  
   constructor(public http:HttpClient,public metodos: HttpMetodosService) { 
   }

    login(item:any){
        
      return this.metodos.post(environment.endpoint.login, item);
    }

}
   /*
       getUsers(endpoint,token){
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'DOLAPIKEY': token
        })
      }
      return this.http.get(this._url + endpoint , httpOptions).pipe( 
        map((res : any) => {return res}
      ));
  
     }
   getApiJSON(endpoint:string,item){
     //let header= new HttpHeaders({})
       //   header.append('content-type','aplication/json')
          let httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            })
          }
    return this.http.post(this._url + endpoint, item, httpOptions ).pipe( 
      map((res : any) => {return res}
    ))
   } //

   
}
*/


