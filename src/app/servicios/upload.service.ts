import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpMetodosService } from './http-metodos.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpReq : HttpMetodosService, private http: HttpClient) { }

  upload(json){
     return this.httpReq.post(environment._url + environment.endpoint.readings, json);
  }
}
