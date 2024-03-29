import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ExamplesModule } from './examples/examples.module';
import { RestoModule } from './resto/resto.module';
import { EkalyModule } from './ekaly/ekaly.module';
import { LivreurModule } from './livreur/livreur.module';
import {HttpClient,HttpClientModule} from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        ExamplesModule,
        HttpClientModule,
        RestoModule,
        DragDropModule,
        EkalyModule,
        LivreurModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
