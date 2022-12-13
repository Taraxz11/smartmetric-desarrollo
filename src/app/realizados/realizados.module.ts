import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RealizadosPageRoutingModule } from './realizados-routing.module';

import { RealizadosPage } from './realizados.page';
import { ComponentsModule } from '../components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RealizadosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RealizadosPage]
})
export class RealizadosPageModule {}
