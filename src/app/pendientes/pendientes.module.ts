import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendientesPageRoutingModule } from './pendientes-routing.module';

import { PendientesPage } from './pendientes.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendientesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PendientesPage]
})
export class PendientesPageModule {}
