import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivreurComponent } from '../livreur/livreur.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommandeComponent } from './commande/commande.component';
import { LivraisonComponent } from './livraison/livraison.component';



@NgModule({
  declarations: [LivreurComponent, NavbarComponent, CommandeComponent, LivraisonComponent],
  imports: [
    CommonModule
  ]
})
export class LivreurModule { }
