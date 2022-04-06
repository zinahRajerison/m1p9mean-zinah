import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestoComponent } from './resto.component';
import { TraitementCommandeComponent } from './traitement-commande/traitement-commande.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [RestoComponent, TraitementCommandeComponent, NavbarComponent],
  imports: [
    CommonModule
  ]
})
export class RestoModule { }
