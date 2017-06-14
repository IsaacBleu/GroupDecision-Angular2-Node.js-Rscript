"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../_services/index");
var router_1 = require("@angular/router");
var SurveyAComponent = (function () {
    function SurveyAComponent(router, userService, alertService) {
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
        this.users = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    SurveyAComponent.prototype.survey = function () {
        var _this = this;
        this.loading = true;
        //this.model._id = this.currentUser._id;
        this.model.username = this.currentUser.username;
        this.userService.surveyA(this.model)
            .subscribe(function (data) {
            //var _id = this.model.id;
            //var username = this.currentUser.username;
            //var set={ac1g: this.model.ac1g,ac1b: this.model.ac1b};
            _this.alertService.success('Second page(第二頁)', true);
            //this.loadAllUsers();
            _this.router.navigate(['/surveyB']);
        }, function (error) {
            _this.alertService.error(error._body);
            _this.loading = false;
        });
    };
    return SurveyAComponent;
}());
SurveyAComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'surveyA',
        templateUrl: 'surveyA.component.html',
        styleUrls: ['./survey.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.UserService,
        index_1.AlertService])
], SurveyAComponent);
exports.SurveyAComponent = SurveyAComponent;
//# sourceMappingURL=surveyA.component.js.map