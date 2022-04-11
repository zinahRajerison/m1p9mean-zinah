import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './examples/landing/landing.component';
import { LoginComponent } from './examples/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { InscriComponent } from './examples/inscri/inscri.component';
import { CommandeComponent } from './examples/commande/commande.component';
import { PlatComponent } from './examples/plat/plat.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { PanierComponent } from './examples/panier/panier.component';
import { ValidationCommandeComponent } from './examples/validation-commande/validation-commande.component';
import { TraitementCommandeComponent } from './resto/traitement-commande/traitement-commande.component';
import { GestionplatComponent } from './resto/gestionplat/gestionplat.component';
import { GestionlivreurComponent } from './ekaly/gestionlivreur/gestionlivreur.component';
import { GestionrestoComponent } from './ekaly/gestionresto/gestionresto.component';
import { CommandeLivraisonComponent } from './ekaly/commande-livraison/commande-livraison.component';
import { LivraisonComponent } from './livreur/livraison/livraison.component';

const routes: Routes =[
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index',                component: LandingComponent },
    { path: 'nucleoicons',          component: NucleoiconsComponent },
    { path: 'examples/landing',     component: LandingComponent },
    { path: 'examples/login',       component: LoginComponent },
    { path: 'examples/profile',     component: ProfileComponent },
    { path: 'examples/inscri',     component: InscriComponent },
    { path: 'examples/restos',     component: CommandeComponent },
    { path: 'examples/plat/:id',     component: PlatComponent },
    { path: 'examples/panier',     component: PanierComponent },
    { path: 'examples/validationCommande',     component: ValidationCommandeComponent },
    { path: 'examples/validationCommande/:id',     component: ValidationCommandeComponent },
    { path: 'resto/commande',     component: TraitementCommandeComponent },
    { path: 'resto/plats',     component: GestionplatComponent },
    { path: 'ekaly/livreurs',     component: GestionlivreurComponent },
    { path: 'ekaly/restos',     component: GestionrestoComponent },
    { path: 'ekaly/commande',     component: CommandeLivraisonComponent },
    { path: 'livreur/commande',     component: LivraisonComponent }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
