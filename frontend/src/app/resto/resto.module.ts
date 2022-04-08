import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { RestoComponent } from './resto.component';
import { TraitementCommandeComponent } from './traitement-commande/traitement-commande.component';
import { NavbarComponent } from './navbar/navbar.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { GestionplatComponent } from './gestionplat/gestionplat.component';

@NgModule({
  declarations: [RestoComponent, TraitementCommandeComponent, NavbarComponent, GestionplatComponent],
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    NgbModule,
    RouterModule
  ]
})
export class RestoModule { }
