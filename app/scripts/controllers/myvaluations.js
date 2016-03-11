'use strict';

/**
 * @ngdoc function
 * @name ipValuationApp.controller:MyvaluationsCtrl
 * @description
 * # MyvaluationsCtrl
 * Controller of the ipValuationApp
 */
angular.module('ipValuationApp')
    .controller('MyvaluationsCtrl', ['$scope', '$route', 'dataService', 'userService', function ($scope, $route, dataService, userService) {

        var self = this;
        var user = userService.getUser();

        self.data = {};
        self.type = 'My';

        if ($route.current.data) {
            self.type = $route.current.data.type;
        }

        self.showResult = false;
        self.isAdmin = self.type === 'All';

        /*
        if ($routeParams.data) {
            self.type = $routeParams.data.type;
        }
*/

        dataService.fetchValuations(self.type, user.iduser).then(function (data) {
            self.data = data;
            self.showResult = true;
            console.log(self.data);
        }, function () {
            self.errMsg = 'No record found!!';
            self.showError = true;
            //self.scrollTo($('body'));
        });

  }]);