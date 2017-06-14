import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../_services/index';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'surveyA',
  templateUrl: 'surveyA.component.html',
  styleUrls:  ['./survey.component.css']
})

export class SurveyAComponent {
  model: any = {};
  loading = false;
  currentUser: User;
  users: User[] = [];

  constructor(
      private router: Router,
      private userService: UserService,
      private alertService: AlertService) { this.currentUser = JSON.parse(localStorage.getItem('currentUser'));}

  survey() {
      this.loading = true;
      //this.model._id = this.currentUser._id;
      this.model.username = this.currentUser.username;
      this.userService.surveyA(this.model)
          .subscribe(
              data => {
                  //var _id = this.model.id;
                  //var username = this.currentUser.username;
                  //var set={ac1g: this.model.ac1g,ac1b: this.model.ac1b};
                  this.alertService.success('Second page(第二頁)', true);
                  //this.loadAllUsers();
                  this.router.navigate(['/surveyB']);
                },
                error => {
                  this.alertService.error(error._body);
                  this.loading = false;
                });
  }


}
