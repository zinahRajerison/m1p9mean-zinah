import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivreurComponent } from '../livreur/livreur.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommandeComponent } from './commande/commande.component';



@NgModule({
  declarations: [LivreurComponent, NavbarComponent, CommandeComponent],
  imports: [
    CommonModule
  ]
})
export class LivreurModule { }
