import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { SurveyAComponent } from './survey/index';
import { SurveyBComponent } from './survey/index';
import { ResultComponent } from './survey/index';
import { Result2Component } from './survey/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'surveyA', component: SurveyAComponent },
    { path: 'surveyB', component: SurveyBComponent },
    { path: 'home', component: HomeComponent },
    { path: 'result', component: ResultComponent },
    { path: 'result2', component: Result2Component },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
