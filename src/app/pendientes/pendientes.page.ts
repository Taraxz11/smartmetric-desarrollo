import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { ProductsService } from '../servicios/products.service';
import { StorageService } from '../servicios/storage.service';
import { AlertController } from '@ionic/angular';
import { validValue } from '../functions';
import {finalize,tap } from 'rxjs/operators';
import { httpErrors } from '../functions';


@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.page.html',
  styleUrls: ['./pendientes.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PendientesPage implements OnInit, AfterViewInit {
  connection : boolean; 
  storage = {
    products :JSON.parse(localStorage.getItem('products')),
    employee :JSON.parse(localStorage.getItem('employee'))
  }
   products = [];
   employee ;
   reload = new Subject<any>();

   errorMessage: string;
   errorSubject = new Subject<string>();
   
  constructor(
              private updateStrg : StorageService, 
              private productS : ProductsService,
              private loadingCtrl: LoadingController,
              private update: StorageService,
              private alertController: AlertController,
              private menuCtrl:MenuController){}

  ngOnInit(){ 
    this.menuCtrl.enable(true)
    if(validValue(this.storage.products) != false){
    this.products= this.storage.products;
    }
    if(validValue(this.storage.employee) != false){
      this.employee= this.storage.employee;
      } 

  }
  ngAfterViewInit(){

    this.updateStrg.getProducts().subscribe(res => {
     // console.log('update storage service');
      this.products = res.text;
      
    })
    this.reload.asObservable().subscribe( res =>{
    //  console.log('reload subject')
      console.log(res)
      this.products = res;

     if(this.products){    
       //if(this.loadingCtrl){console.log('dismiss loading');this.loadingCtrl.dismiss()}
        window.location.reload(); 
       }
      if(res == null){
      // if(this.loadingCtrl){console.log('dismiss loading');this.loadingCtrl.dismiss()}
        this.alert('Ruta no disponible', 'No se ha encontrado ruta')
      } 
    })
  
  }
  showButton(){
 
    if(validValue(this.products) == false || this.products.length == 0 ){
      return true;   
   }
    return false;
  }

  download(){
  
  this.productS.products(localStorage.getItem('token'),this.employee.id)
  .pipe( 
     tap(res =>{
      this.showLoading()     
      if(res[0].data != undefined)
      localStorage.setItem('products', JSON.stringify(res[0].data)) ; 
      this.reload.next(JSON.parse(localStorage.getItem('products'))); 
  }),tap(()=>{
    console.log('finalizado')
  
      console.log('dismiss loading finalizado');
     setTimeout(()=>{ this.loadingCtrl.dismiss() },3000)
  
  })).subscribe(() => {      
    console.log('Todo correcto')
    }, (error) => {
    let message =  httpErrors(error.status)
    this.alert('Alerta',message)
  })
  }
  
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Obteniendo ruta...',
    });

    loading.present();
  }
  async alert(header:string,message:string){
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}
