import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms'
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AppConfig } from './app.config';
import { EqualValidator } from './register/equal-validator';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { CarouselComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { SurveyAComponent } from './survey/index';
import { SurveyBComponent } from './survey/index';
import { ResultComponent } from './survey/index';
import { Result2Component } from './survey/index';
import { Ref1Component } from './reference/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        CarouselComponent,
        SurveyAComponent,
        SurveyBComponent,
        ResultComponent,
        Result2Component,
        RegisterComponent,
        Ref1Component,
        EqualValidator
    ],
    providers: [
        AppConfig,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        NgModel
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
