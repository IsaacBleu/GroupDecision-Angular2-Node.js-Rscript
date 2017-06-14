import { Component, OnInit,Input } from '@angular/core';
import { AlertService, UserService } from '../_services/index';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'result2',
  templateUrl: 'result2.component.html',
  styleUrls:  ['./survey.component.css']
})

export class Result2Component {
  model: any = {};
  loading = false;
  currentUser: User;
  users: User[] = [];
  //posts: any = [];
@Input() posts: any=[];

  constructor(
      private router: Router,
      private userService: UserService,
      private alertService: AlertService) { this.currentUser = JSON.parse(localStorage.getItem('currentUser'));}

  ngOnInit() {
    //this.userService.getAll().subscribe(posts => {
    //this.loadAllUsers();
    this.userService.getResult(this.currentUser).subscribe(users => { this.users = users; });
      //this.posts = posts;
    //});

          }



  result() {
      this.loading = true;
      //this.model._id = this.currentUser._id;
      this.model.username = this.currentUser.username;
      this.userService.result(this.model)
          .subscribe(
              data => {
                  this.alertService.success('查詢結果', true);
                  //this.loadAllUsers();
                  this.router.navigate(['/result2']);
                },
                error => {
                  this.alertService.error(error._body);
                  this.loading = false;
                });
  }
  //private loadAllUsers() {
        //this.userService.getAll().subscribe(users => { this.users = users; });
    //}

}
