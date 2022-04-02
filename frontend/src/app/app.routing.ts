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

const routes: Routes =[
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index',                component: ComponentsComponent },
    { path: 'nucleoicons',          component: NucleoiconsComponent },
    { path: 'examples/landing',     component: LandingComponent },
    { path: 'examples/login',       component: LoginComponent },
    { path: 'examples/profile',     component: ProfileComponent },
    { path: 'examples/inscri',     component: InscriComponent },
    { path: 'examples/restos',     component: CommandeComponent },
    { path: 'examples/plat/:id',     component: PlatComponent },
    { path: 'examples/panier',     component: PanierComponent },
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
