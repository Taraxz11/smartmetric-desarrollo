import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders,HttpErrorResponse} from '@angular/common/http'
import { map } from 'rxjs/operators';
import { HttpMetodosService } from './http-metodos.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
   
  constructor(public http:HttpClient,public metodos: HttpMetodosService) { }

  users(token:string, id: number){
   
     return this.metodos.get(environment.endpoint.users + id, token)
  }
  
}
