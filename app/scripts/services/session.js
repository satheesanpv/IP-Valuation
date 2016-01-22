'use strict';

/**
 * @ngdoc service
 * @name ipValuationApp.Session
 * @description
 * # Session
 * Service in the ipValuationApp.
 */
angular.module('ipValuationApp')
  .service('Session', function () {
   
    var user = {};
    this.create = function (data) {
      this.id = data.jwt;
      this.userName = data.user.name;
      this.userId = data.user.id;
      this.userRole = data.user.role;
      this.user = data.user;
    };
  
    this.destroy = function () {
      this.id = null;
      this.user= null;
      this.userRole = null;
      this.userId = null;
    };
  
  this.getUser = function() {
      return this.user;
    }  
  
});