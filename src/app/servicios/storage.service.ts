import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  private storagePendings = new Subject<any>(); //need to create a subject
  private storageCompleted = new Subject<any>(); //need to create a subject
    
        updateProducts(message : any) { //the component that wants to update something, calls this fn
            this.storagePendings.next({ text: message }); //next() will feed the value in Subject
        }
    
        getProducts(): Observable<any> { //the receiver component calls this function 
            return this.storagePendings.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
        }

        updateCompleted(message : any) { 
          this.storageCompleted.next({ text: message }); 
      }
        getCompleted(): Observable<any> { //the receiver component calls this function 
        return this.storageCompleted.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
      }
}

/*

 private storage = new Subject<any>(); //need to create a subject
    
        sendUpdate(message: any) { //the component that wants to update something, calls this fn
            this.storage.next({ text: message }); //next() will feed the value in Subject
        }
    
        getUpdate(): Observable<any> { //the receiver component calls this function 
            return this.storage.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
        }

*/