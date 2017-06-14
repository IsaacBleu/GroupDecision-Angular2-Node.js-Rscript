import { Component } from '@angular/core';
import { AlertService, UserService } from '../_services/index';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'surveyB',
  templateUrl: 'surveyB.component.html',
  styleUrls:  ['./survey.component.css']
})

export class SurveyBComponent {
  model: any = {};
  loading = false;
  currentUser: User;
  user: User;
  quess = [
    { value: 9, display: '9:1' },
    { value: 7, display: '7:1' },
    { value: 5, display: '5:1' },
    { value: 3, display: '3:1' },
    { value: 1, display: '1:1' },
    { value: 0.3, display: '1:3' },
    { value: 0.2, display: '1:5' },
    { value: 0.14, display: '1:7' },
    { value: 0.11, display: '1:9' }
  ];

  private log: string ='';

  private logRadio(element: HTMLInputElement): void {
      this.log += `Radio ${element.value} was selected\n`
  }

  constructor(
      private router: Router,
      private userService: UserService,
      private alertService: AlertService) { this.currentUser = JSON.parse(localStorage.getItem('currentUser'));}

  survey() {
      this.loading = true;
      //this.model._id = this.currentUser._id;
      this.model.username = this.currentUser.username;
      this.userService.surveyB(this.model)
          .subscribe(
              data => {
                  this.alertService.success('Done(填寫完畢)', true);
                  this.router.navigate(['/home']);
                },
              error => {
                  this.alertService.error(error._body);
                  this.loading = false;
                });
      }


  }
