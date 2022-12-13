import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpMetodosService } from './http-metodos.service';
@Injectable({
  providedIn: 'root'
})
export class RouteInfoService {

  constructor(private httpRequest:HttpMetodosService) { }

  getLots(id:string, token:string){
    return this.httpRequest.get(environment.endpoint.routeInfo+id,token)
  }
}
