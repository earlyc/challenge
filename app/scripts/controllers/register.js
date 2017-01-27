'use strict';

/**
 * @ngdoc function
 * @name challengeApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the challengeApp
 */
angular.module('challengeApp')
.controller('RegisterCtrl', function($scope, $http, $state) {

  $scope.validator = {
    one: false,
    two: false,
    three: false,
    isValid: function() {
      return this.one && this.two && this.three;
    }
  };

  // we will store all of our form data in this object
  $scope.formData = {};
  $scope.teamMembers = [{id: '1'}];
  $scope.progress = 1;
  $scope.submitted = false;

  // function to process the form
  $scope.processForm = function() {

    var regData = [];
    regData.push($scope.formData);
    regData.push($scope.teamMembers);


    $http({
      method  : 'POST',
      url     : 'http://bsc.uhcl.edu/scripts/challenge16reg.php',
      data    : regData,
      headers : {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data) {
      $scope.submitted = true;
      console.log('Registration Submitted', data);
    })
    .error(function(data, status) {
      $scope.submitted = false;
      console.error('Reg Error', status, data);
    })
    .finally(function() {
      $state.go('register.done');
    });
  };

  $scope.stepTwo = function() {
    for (var i = $scope.teamMembers.length + 1; i <= $scope.formData.teamSize; i++) {
      $scope.teamMembers.push({'id':i});
    }
    for (var j = $scope.teamMembers.length; j > $scope.formData.teamSize; j--) {
      $scope.teamMembers.pop();
    }
  };

  $scope.next = function(step) {
    if(step === 2) {
      $scope.stepTwo();
      $scope.progress = 2;
      $scope.validator.two = true;
    }
    else if(step === 1) {
      $scope.progress = 1;
      $scope.validator.one = true;
    }
    else if(step === 3) {
      $scope.progress = 3;
      $scope.validator.three = true;
    }
    else {
      $scope.progress = 4;
    }
  };

});
