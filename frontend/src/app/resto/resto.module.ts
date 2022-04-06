import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestoComponent } from './resto.component';
import { TraitementCommandeComponent } from './traitement-commande/traitement-commande.component';
import { NavbarComponent } from './navbar/navbar.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { GestionplatComponent } from './gestionplat/gestionplat.component';

@NgModule({
  declarations: [RestoComponent, TraitementCommandeComponent, NavbarComponent, GestionplatComponent],
  imports: [
    CommonModule,
    DragDropModule
  ]
})
export class RestoModule { }
