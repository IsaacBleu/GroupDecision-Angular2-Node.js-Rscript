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
var ResultComponent = (function () {
    function ResultComponent(router, userService, alertService) {
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
        this.users = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    ResultComponent.prototype.ngOnInit = function () {
    };
    ResultComponent.prototype.result = function () {
        var _this = this;
        this.loading = true;
        //this.model._id = this.currentUser._id;
        this.model.username = this.currentUser.username;
        this.userService.result(this.model)
            .subscribe(function (data) {
            _this.alertService.success('Query already submit, you can check decision result(查詢已送出，請查看結果)', true);
            //this.loadAllUsers();
            //this.router.navigate(['/result2']);
        }, function (error) {
            _this.alertService.error(error._body);
            _this.loading = false;
        });
    };
    return ResultComponent;
}());
ResultComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'result',
        templateUrl: 'result.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.UserService,
        index_1.AlertService])
], ResultComponent);
exports.ResultComponent = ResultComponent;
//# sourceMappingURL=result.component.js.map