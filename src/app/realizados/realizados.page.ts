import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StorageService } from '../servicios/storage.service';
import { UploadService } from '../servicios/upload.service';
import { httpErrors } from '../functions';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-realizados',
  templateUrl: './realizados.page.html',
  styleUrls: ['./realizados.page.scss'],
})
export class RealizadosPage implements OnInit, AfterViewInit {
  
   completed = JSON.parse(localStorage.getItem('completed'));
  

   constructor(private updateStrg : StorageService, 
    private uploadS : UploadService,
    private alertController: AlertController) { }

 
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
    console.log(data);
    this.uploadS.upload(data).subscribe( (res) =>{
     console.log(res);
     if(res['success']['code'] == 200){
      localStorage.removeItem('readings');
      localStorage.removeItem('completed');
      window.location.reload();
     }
      
      //else Fallo en la subida, intente de nuevo
    },(error) =>{
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
}
