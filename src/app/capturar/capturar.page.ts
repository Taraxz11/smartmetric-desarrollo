import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IProducts,Datum, Client, IReading, IReadings } from '../interfaces';
import { FormGroup, FormArray, Validators, FormBuilder, FormControl, RequiredValidator } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { StorageService } from '../servicios/storage.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-capturar',
  templateUrl: './capturar.page.html',
  styleUrls: ['./capturar.page.scss'],
})
export class CapturarPage implements OnInit {
  id: any;
  measurer: string;
  fgReading: FormGroup;  
  current:string //reading
  confirm:string //reading
  details = JSON.parse(localStorage.getItem('anomalies')); 
  products = JSON.parse(localStorage.getItem('products'));
  employee = JSON.parse(localStorage.getItem('employee'));
  client : Datum;

  employeeID:string;
  productID:string;
 // anomalies:number[] = [] //id anomalías seleccionadas
 // descAnomalies:string[] = []
  anomalies:number;
  descAnomalies:string;
  latlong:string
  date = new Date();
  
  readings: any = [];
  example:any = [];
  reading:IReading;
  completed:any=[];
 
  option={
    slidesPerView:1.5,
    centeredSlides: true,
    loop:true,
    spaceBetween:10  
  }


  image: string[]=[];  //variable donde almacena la foto


  constructor(
    private camera: Camera,
    private alertController: AlertController, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private updateStrg : StorageService,
    private geolocation: Geolocation
    ) { 
      this.fgReading = this.fb.group({
        "current": new FormControl("",Validators.required),
        "confirm": new FormControl("",[Validators.required, Validators.pattern('[0-9]+')])
      })

    }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.employeeID=this.employee.id;
    this.productID=this.products[this.id].id;
    console.log(this.products)
    this.client = {
      id: this.products[this.id].id,
      label: this.products[this.id].label,
      address: this.products[this.id].address,
      last_measure:this.products[this.id].last_measure,
      client :       {
        rowid: this.products[this.id].client.rowid,
        name:  this.products[this.id].client.name
      }
    } 
  }
  
  validation(){

    var fgVal = this.fgReading.value;
    this.current = fgVal.current;
    this.confirm = fgVal.confirm;
    console.log(this.fgReading.errors)
    if (this.fgReading.invalid) {
      this.alert('Alerta', 'Verifique la lectura ingresada.')
     }
     else{      
        if(this.current != this.confirm){
           this.alert('Alerta','La lectura ingresada no coincide')
         }else{
           this.pushReading(
            this.employeeID,
            this.productID,
            this.current,
            this.anomalies, 
            this.descAnomalies,
            this.image)
           
           }
      }

      this.current='';
      this.confirm='';
      
      
  }
      
  async alert(header:string,message:string, func?:any){
    const alert = await this.alertController.create({
      header: header,
      message: message,
      //buttons: ['Aceptar'],
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
            console.log('Canceled', data);
          }
        },
        {
          text: 'Aceptar',
          handler: func
          //(data: any) => {
          //  console.log('Saved Information', data);
         // }
        }
      ]
    });

    await alert.present();
  }
  
  pushAnomaly(item){
    //this.anomalies.unshift(item);
    console.log(item);
 } 

  handleChange(e) {
   let ev = e.detail.value
   //this.descAnomalies = ev.map( res => res.label) //arreglo con la desc
   //this.anomalies= ev.map( res => {return Number(res.rowid)}) //arreglo con los id
     this.descAnomalies=ev.label;
     this.anomalies=ev.rowid;
     console.log(ev)
  }

  pushReading(employee:string,product:string,hydrometer:string,anomaly:number, descAnomaly : string,photos:string[]){
    let reading;
    if(localStorage.getItem('readings')){
      this.readings=JSON.parse(localStorage.getItem('readings'))
    } 
    if(photos.length >=2){
    this.geolocation.getCurrentPosition().then((resp)=>{console.log(resp)
      let lat = resp.coords.latitude.toString(); 
      let lon = resp.coords.longitude.toString();
      let loc = lat + ', ' + lon
      reading = {
        employee_id : employee,
        product_id : product,
        hydrometer  : hydrometer,
        date :  `${this.date.getFullYear()}-${this.date.getMonth()}-${this.date.getDate()} ${this.date.getHours()}:${this.date.getMinutes()}:${this.date.getSeconds()}`,
        latlong : loc,
        photos: photos,
        anomaly : anomaly,
        description: descAnomaly
       }
       console.log(reading)
       this.readings.push(reading);     
        localStorage.setItem('readings', JSON.stringify(this.readings));
        console.log(reading)
        this.pendingsUpdate();
        console.log(this.date);
        this.alert('Finalizado', 'Captura realizada con éxito')
        this.router.navigate( ['/pendientes']);
    }).catch((error)=>{
      console.log('Error getting location', error)
      this.alert('Alerta', 'Error al realizar captura')
    })
  }else{
    this.alert('Captura Incompleta', 'Debe tener un mínimo de 2 fotos.')
  }
    //meter el alert antes del navigate
    //hacer un if(photos.length >=2){ } else{ this.alert('Alerta', 'Se requiere de 2 fotos')}
  }

    //Codigo para la funcionalidad de la camarav
    takePicture() {
      const options: CameraOptions = {
        quality: 30,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.CAMERA
      };
      this.camera.getPicture(options)
      .then((imageData) =>{
        this.image.push('data:image/jpeg;base64,' + imageData);
      }, (err) => {
        console.log(err);
      });
    }
  
  pendingsUpdate(){
    if(localStorage.getItem('completed')){
      this.completed=JSON.parse(localStorage.getItem('completed'))
    } 

    for( let product of this.products){
          if(product.id != this.productID){
            this.example.push(product)
          }else{
            this.completed.push(product);
          }          
    }
    this.products = []
    this.products = this.example
    localStorage.setItem('products', JSON.stringify(this.products))
    localStorage.setItem('completed',JSON.stringify(this.completed))
    this.updateStrg.updateProducts(JSON.parse(localStorage.getItem('products')));
    this.updateStrg.updateCompleted(JSON.parse(localStorage.getItem('completed')));

  }
  
  report(){
    var fgVal = this.fgReading.value;
    this.current = fgVal.current;
    let currentReading = {
      index:this.id,
      id: this.productID,
      label: this.products[this.id].label,
      address: this.products[this.id].address,
      last_measure:this.products[this.id].last_measure,
      current : this.current,
      anomalies : this.descAnomalies,
      date : this.dateSpanish(this.date.toString()),
      client :       {
        rowid: this.products[this.id].client.rowid,
        name:  this.products[this.id].client.name
      },
      images: this.image
    }
    this.router.navigate(['/reporte', JSON.stringify(currentReading)]);
  } 
  
  dateSpanish(fecha:string){
    let date = new Date(fecha)
    let day = {
      1:'Lunes',
      2:'Martes',
      3:'Miércoles',
      4:'Jueves',
      5:'Viernes',
      6:'Sábado',
      0:'Domingo'
     } 
     let month = {
      1:'Enero',
      2:'Febrero',
      3:'Marzo',
      4:'Abril',
      5:'Mayo',
      6:'Junio',
      7:'Julio',
      8:'Agosto',
      9:'Septiembre',
      10:'Octubre',
      11:'Noviembre',
      12:'Diciembre'
    }
    return `${ day[date.getDay()]}, ${date.getDate()} de ${month[date.getMonth()]} del ${date.getFullYear()}` 
  }
}



 