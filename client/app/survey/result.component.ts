import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../_services/index';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'result',
  templateUrl: 'result.component.html'
})

export class ResultComponent {
  model: any = {};
  loading = false;
  currentUser: User;
  users: User[] = [];


  constructor(
      private router: Router,
      private userService: UserService,
      private alertService: AlertService) { this.currentUser = JSON.parse(localStorage.getItem('currentUser'));}

  ngOnInit() {

          }

  result() {
      this.loading = true;
      //this.model._id = this.currentUser._id;
      this.model.username = this.currentUser.username;
      this.userService.result(this.model)
          .subscribe(
              data => {
                  this.alertService.success('Query already submit, you can check decision result(查詢已送出，請查看結果)', true);
                  //this.loadAllUsers();
                  //this.router.navigate(['/result2']);
                },
                error => {
                  this.alertService.error(error._body);
                  this.loading = false;
                });
  }


}
