import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { EkalyComponent } from './ekaly.component';
import { GestionlivreurComponent } from './gestionlivreur/gestionlivreur.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GestionrestoComponent } from './gestionresto/gestionresto.component';

@NgModule({
  declarations: [EkalyComponent, GestionlivreurComponent, NavbarComponent, GestionrestoComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule
  ]
})
export class EkalyModule { }
