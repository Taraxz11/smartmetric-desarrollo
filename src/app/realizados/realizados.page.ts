import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StorageService } from '../servicios/storage.service';
import { UploadService } from '../servicios/upload.service';
import { httpErrors } from '../functions';
import { AlertController, LoadingController } from '@ionic/angular';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-realizados',
  templateUrl: './realizados.page.html',
  styleUrls: ['./realizados.page.scss'],
})
export class RealizadosPage implements OnInit, AfterViewInit {
  
   completed = JSON.parse(localStorage.getItem('completed'));
  

   constructor(private updateStrg : StorageService, 
    private uploadS : UploadService,
    private alertController: AlertController,
    private loadingCtrl: LoadingController) { }

 
  ngAfterViewInit(): void {
     this.updateStrg.getCompleted().subscribe(res => {
      console.log(res.text)
      this.completed=res.text
     });
    }

  ngOnInit() {

  }

  connection : boolean = true;

  upload(){
   /*   let data =JSON.parse(localStorage.getItem('readings')) 
   */

   let data ={
    request_data: JSON.parse(localStorage.getItem('readings'))
  } 
    console.log('la data a subir')  
    console.log(data);
    this.uploadS.upload(data).pipe(
      tap( res => {
        console.log('respuesta del server')
        console.log(res)
        this.showLoading('Subiendo capturas...')}),
      tap((res)=>{
        if(res['success']['code'] == 200){
          localStorage.removeItem('readings');
          localStorage.removeItem('completed');
          window.location.reload();
          this.alert('Completado','Subida exitosa.')
         }
      })
    ).subscribe( (res) =>{
     console.log('suscribe del upload');
    },(error) =>{
      console.log(error)
      let message =  httpErrors(error.status)
      this.alert('Alerta',message)
    }); 

  }
  async alert(header:string,message:string){
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
  async showLoading(msg:string) {
    const loading = await this.loadingCtrl.create({
      message: msg,
    });

    loading.present();
  }
}
