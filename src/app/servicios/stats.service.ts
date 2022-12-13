import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpMetodosService } from './http-metodos.service';
@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private httpRequest:HttpMetodosService) { }
 //creo que aquí también debería pedir algún ID para saber de qué lotes estamos obteniendo ese consumo de agua
 //o podría ser que represente todos...?
  getLiters( token:string){
    return this.httpRequest.get(environment.endpoint.stats, token)
  }
}
