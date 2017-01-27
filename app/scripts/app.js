'use strict';

/**
 * @ngdoc overview
 * @name challengeApp
 * @description
 * # challengeApp
 *
 * Main module of the application.
 */
angular
  .module('challengeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'slick'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('sponsors', {
        url: '/sponsors',
        templateUrl: 'views/sponsors.html',
        controller: 'SponsorsCtrl',
        controllerAs: 'sponsors'
      })
      .state('faqs', {
        url: '/faqs',
        templateUrl: 'views/faqs.html',
        controller: 'FaqsCtrl',
        controllerAs: 'faqs'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register',
        abstract: true,
      })
      .state('register.one', {
        url: '/one',
        templateUrl: 'views/register-one.html',
        controller: function($scope) {
          $scope.$watch('registerForm.register-one.$valid', function(value) {
            $scope.validator.one = value;
          });
        }
      })
      .state('register.two', {
        url: '/two',
        templateUrl: 'views/register-two.html',
        controller: function($scope) {
          $scope.$watch('registerForm.register-two.$valid', function(value) {
            $scope.validator.two = value;
          });
        }
      })
      .state('register.three', {
        url: '/three',
        templateUrl: 'views/register-three.html',
        controller: function($scope) {
          $scope.$watch('registerForm.register-three.$valid', function(value) {
            $scope.validator.three = value;
          });
        }
      })
      .state('register.four', {
        url: '/four',
        templateUrl: 'views/register-four.html'
      })
      .state('register.done', {
        url: '/done',
        templateUrl: 'views/register-done.html'
      });
      $urlRouterProvider.when('/register','/register/one');
      $urlRouterProvider.otherwise('/');
  })
  .controller('HeaderCtrl', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  });
