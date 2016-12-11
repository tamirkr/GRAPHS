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
var core_1 = require('@angular/core');
var service_1 = require('../shared/service');
var StatsComponent = (function () {
    function StatsComponent(currencyService) {
        this.currencyService = currencyService;
        this.hasError = false;
        this.categories = ['USD', 'GBP', 'JPY', 'ILS'];
    }
    StatsComponent.prototype.drawChart = function (data, value) {
        var _this = this;
        this.options = {
            title: { text: 'Bar chart' },
            series: [{
                    name: 'Currency',
                    data: (function () {
                        delete _this.categories[value];
                        var updateData = [];
                        for (var _i = 0, _a = _this.categories; _i < _a.length; _i++) {
                            var i = _a[_i];
                            updateData.push(data[i]);
                        }
                        return updateData;
                    })(),
                    dataLabels: {
                        enabled: true
                    },
                }],
            xAxis: [{
                    categories: this.categories
                }],
            chart: {
                type: 'column',
                width: 400,
                height: 400,
                style: {
                    fontFamily: 'serif'
                }
            }
        };
    };
    StatsComponent.prototype.ngOnInit = function () {
        this.getCurrency();
        this.onchange('ILS');
    };
    StatsComponent.prototype.getCurrency = function () {
        var _this = this;
        this.currencyService.getCurrency()
            .then(function (currency) { return _this.currency = currency; });
    };
    StatsComponent.prototype.getRates = function (value) {
        var _this = this;
        this.currencyService.getRates(value)
            .subscribe(function (rates) {
            _this.rates = rates;
            _this.drawChart(_this.rates, _this.dataValue);
        }, function (error) { return _this.errorMessage = error; });
        return this.rates;
    };
    StatsComponent.prototype.validateCurrency = function (value) {
        if (value === 'default') {
            this.hasError = true;
        }
        else {
            this.hasError = false;
        }
    };
    StatsComponent.prototype.onchange = function (value) {
        this.categories = ['USD', 'GBP', 'JPY', 'ILS'];
        this.dataValue = value;
        var index = this.categories.indexOf(value);
        if (index > -1) {
            this.categories.splice(index, 1);
        }
        this.getRates(value);
    };
    StatsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-stats',
            templateUrl: 'stats.component.html',
            animations: [
                core_1.trigger('flyInOut', [
                    core_1.state('in', core_1.style({ transform: 'translateX(0)' })),
                    core_1.transition('void => *', [
                        core_1.style({ transform: 'translateX(-100%)' }),
                        core_1.animate(1000)
                    ]),
                    core_1.transition('* => void', [
                        core_1.animate(100, core_1.style({ transform: 'translateX(100%)' }))
                    ])
                ])
            ],
            styles: ['.spanpointer { cursor: pointer} .dropdown { margin: 10px 0 0 28px}']
        }), 
        __metadata('design:paramtypes', [service_1.CurrencyService])
    ], StatsComponent);
    return StatsComponent;
}());
exports.StatsComponent = StatsComponent;
//# sourceMappingURL=stats.component.js.map