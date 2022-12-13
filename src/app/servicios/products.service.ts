import { Injectable } from '@angular/core';
import { HttpMetodosService} from '../servicios/http-metodos.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IProducts } from '../interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(public http:HttpClient, public metodos: HttpMetodosService) { }

  products(token:string, id: number){
   
    return this.metodos.get(environment.endpoint.users + id, token);
  
    }


}
