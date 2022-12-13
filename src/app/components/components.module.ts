import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsProductsComponent } from './cards-products/cards-products.component';



@NgModule({
  declarations: [
    CardsProductsComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[CardsProductsComponent]
})
export class ComponentsModule { }
