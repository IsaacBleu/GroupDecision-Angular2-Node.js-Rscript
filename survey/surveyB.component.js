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
var SurveyBComponent = (function () {
    function SurveyBComponent(router, userService, alertService) {
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
        this.quess = [
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
        this.log = '';
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    SurveyBComponent.prototype.logRadio = function (element) {
        this.log += "Radio " + element.value + " was selected\n";
    };
    SurveyBComponent.prototype.survey = function () {
        var _this = this;
        this.loading = true;
        //this.model._id = this.currentUser._id;
        this.model.username = this.currentUser.username;
        this.userService.surveyB(this.model)
            .subscribe(function (data) {
            _this.alertService.success('Done(填寫完畢)', true);
            _this.router.navigate(['/home']);
        }, function (error) {
            _this.alertService.error(error._body);
            _this.loading = false;
        });
    };
    return SurveyBComponent;
}());
SurveyBComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'surveyB',
        templateUrl: 'surveyB.component.html',
        styleUrls: ['./survey.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.UserService,
        index_1.AlertService])
], SurveyBComponent);
exports.SurveyBComponent = SurveyBComponent;
//# sourceMappingURL=surveyB.component.js.map