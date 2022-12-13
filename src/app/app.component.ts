import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Pendientes', url: '/pendientes', icon: 'list-circle' },
    { title: 'Ruta', url: '/ruta', icon: 'analytics' },
    { title: 'Realizados', url: '/realizados', icon: 'checkmark-circle' },
    { title: 'Estadística', url: '/estadistica', icon: 'bar-chart' },
    { title: 'Ayuda', url: '/ayuda', icon: 'help-circle' },
  ];
  public local = JSON.parse(localStorage.getItem('employee'));
  public employee; 
 
  constructor(private menuCtrl: MenuController, private router:Router) {
     if(this.local){
      this.employee= this.local.firstname+' '+ this.local.lastname
     }

     
  }

  

  logOut(){
    localStorage.clear();
    this.menuCtrl.enable(false)
    this.router.navigate(['/log-in'])

  }
}
