import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpMetodosService } from './http-metodos.service';
@Injectable({
  providedIn: 'root'
})

//GET /users/login/{login}   info del empleado, ID
// GET /smartmetricapi/employe/id la ruta que debe seguir el empleado


export class EmployeService {

   
  constructor(private httpRequest:HttpMetodosService) { }
   
  employeInfo(login:string, token:string){
     return this.httpRequest.get(environment.endpoint.employe + login, token)
  }
}
