import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginServiceService } from '../servicios/login-service.service';
import { Router } from '@angular/router';
import { concatMap, tap} from 'rxjs/operators';
import { FormGroup, FormArray, Validators, FormBuilder, FormControl, RequiredValidator } from '@angular/forms';
import { AlertController, MenuController } from '@ionic/angular';
import { AnomaliasService } from '../servicios/anomalias.service';
import { EmployeService} from '../servicios/employe.service';
import {ProductsService} from '../servicios/products.service';
import { LoadingController } from '@ionic/angular';
import { ComponentsModule } from '../components/components.module';
import { StatsService } from '../servicios/stats.service';
import { RouteInfoService } from '../servicios/route-info.service';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { httpErrors } from '../functions';
import { Subject } from 'rxjs/internal/Subject';
import { Network } from '@awesome-cordova-plugins/network/ngx';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  formularLogin: FormGroup;
  respuesta: any;
  token:any;
  employeeID:any;
  eye = 'eye-off-outline';
  type ='password';

  errorSubject = new Subject<string>();
  constructor(private alertController: AlertController, 

  connection : boolean = true;
   
  constructor(
    private network: Network, 
    private alertController: AlertController, 
    public fb: FormBuilder, 
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private loginService: LoginServiceService,
    private anomalias: AnomaliasService,
    private employe: EmployeService,
    private products: ProductsService,
    private stats: StatsService,
    private routeInfo: RouteInfoService,
    private loadingCtrl: LoadingController,
    private menuCtrl: MenuController,
    private screenOrientation: ScreenOrientation) {
    this.formularLogin = this.fb.group({
      "user": new FormControl("",Validators.required),
      "password": new FormControl("",Validators.compose([Validators.required,Validators.minLength(8)]) )
    })
    window.addEventListener('offline', ()=>{
      this.connection = false;
     })
  }

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

     this.token = localStorage.getItem('token');
     if(this.token){ console.log(this.token); this.router.navigate(['/pendientes'])}
     this.menuCtrl.enable(false);
  }
  
  visible(){
    
    if(this.eye =='eye-outline'){
      this.eye = 'eye-off-outline';
      this.type='password'

    }else if(this.eye =='eye-off-outline'){
      this.eye ='eye-outline'
      this.type='text'

    }
  }
  async login() {
    var datos = this.formularLogin.value;
    let jsonLogin = {
      "login": datos.user,
      "password": datos.password
    }

    if (this.connection != true) {
      this.loadingCtrl.dismiss();
      this.alert('Alerta', 'No cuentas con conexion a Internet')
      console.log(this.connection);
     
    }
    else{
    
     if (this.formularLogin.invalid) {      
        this.alert('Alerta', 'Datos incompletos')
      }{
      this.loginService.login(jsonLogin).pipe(     
        tap( post => { console.log(post)
          this.showLoading();
          this.token=post['success']['token'];
        localStorage.setItem('token', this.token)}),
        concatMap( employee => this.employe.employeInfo(jsonLogin.login, this.token)),
        tap( resp => { if(resp!=undefined) localStorage.setItem('employee', JSON.stringify(resp))}),
        concatMap( products => this.products.products(this.token, products.id)),
        tap( resp => { console.log(resp)
         this.employeeID=resp[0].employee
          if(resp[0].data!==undefined){
          localStorage.setItem('products', JSON.stringify(resp[0].data))
          }}),
        concatMap( anomalies => this.anomalias.getAnomalias(this.token)),
        tap( resp => { if(resp!=undefined) localStorage.setItem('anomalies', JSON.stringify(resp))}),
        concatMap(stats => this.stats.getLiters(this.token)),
        tap(resp => {
          if(resp!=undefined) localStorage.setItem('stats', JSON.stringify(resp))}),
        concatMap(route => this.routeInfo.getLots(this.employeeID,this.token)),
        tap(resp => {  console.log(resp); 
            if(resp!=undefined) localStorage.setItem('route', JSON.stringify(resp))}),  
        tap(res =>{ if(this.loadingCtrl){this.loadingCtrl.dismiss()}})
       ).subscribe(() => {      
        this.router.navigate(['/pendientes']);
        this.menuCtrl.enable(true);
        }, (error) => {
        let message =  httpErrors(error.status)
        this.alert('Alerta',message)
      })
      }

    this.formularLogin.reset();
  }

  //Verificar conexion a internet LOGIN
  async openAlert(){
    const alert = await this.alertController.create({
      header: 'Verificar conexion a internet',
      message: 'Usted no tiene conexion a internet',
      buttons: [{
        text: "Ok"
      }]
    })
    await alert.present();
  }
  //DONE

  async alert(header:string,message:string){
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...',
    });

    loading.present();
  }
}


/*
this.loginService.login(jsonLogin).subscribe( res =>{
        console.log(res['success']['token']);
        localStorage.setItem('token',res['success']['token']);
        this.token= localStorage.getItem('token');

        this.employe.employeInfo(jsonLogin.login, this.token).subscribe(
          res => { 
            this.products.products(this.token,res['id']).subscribe( 
              res =>{              
    
                localStorage.setItem('products', JSON.stringify(res))

                this.router.navigate(['/pendientes']);

              });
            })
        
        this.anomalias.getAnomalias(this.token).subscribe( res =>{
         
        localStorage.setItem('anomalies', JSON.stringify(res));
        })
      

    },(error)=>{
       console.log(error)
       this.alert('Alerta','Credenciales incorrectas')

      // if(error.status){enviar alerta correspondiente al error}
    })



*/

/*() => {

      // Here you are sure that the send has shared the data sucessFully

    }, (error) => {

    } 
    {
      next(x) {
        console.log(x);
      },
      error(err) {
        //this.alert('Alerta','Credenciales incorrectas');
        console.error('something wrong occurred: ' + err);
      }, 
      complete() {
        console.log('done');
       // this.router.navigate(['/pendientes']);
      },
    }
    
    */