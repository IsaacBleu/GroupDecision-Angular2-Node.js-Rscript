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
var Result2Component = (function () {
    function Result2Component(router, userService, alertService) {
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
        this.users = [];
        //posts: any = [];
        this.posts = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    Result2Component.prototype.ngOnInit = function () {
        var _this = this;
        //this.userService.getAll().subscribe(posts => {
        //this.loadAllUsers();
        this.userService.getResult(this.currentUser).subscribe(function (users) { _this.users = users; });
        //this.posts = posts;
        //});
    };
    Result2Component.prototype.result = function () {
        var _this = this;
        this.loading = true;
        //this.model._id = this.currentUser._id;
        this.model.username = this.currentUser.username;
        this.userService.result(this.model)
            .subscribe(function (data) {
            _this.alertService.success('查詢結果', true);
            //this.loadAllUsers();
            _this.router.navigate(['/result2']);
        }, function (error) {
            _this.alertService.error(error._body);
            _this.loading = false;
        });
    };
    return Result2Component;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Result2Component.prototype, "posts", void 0);
Result2Component = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'result2',
        templateUrl: 'result2.component.html',
        styleUrls: ['./survey.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.UserService,
        index_1.AlertService])
], Result2Component);
exports.Result2Component = Result2Component;
//# sourceMappingURL=result2.component.js.map