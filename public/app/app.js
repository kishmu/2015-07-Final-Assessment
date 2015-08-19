angular.module('giphy', ['ngRoute', 'ngSanitize', 'ui.router'])
.value('urlprefix', "http://api.giphy.com/v1/gifs/search?q=")
.value('urlparams', "&limit=10&api_key=dc6zaTOxFJmzC") // limit to 10 results 
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise("/giphy");

  $stateProvider
    // .state('signin', {
    //   url: '/signin',
    //   templateUrl: 'app/auth/signin.html',
    //   controller: 'AuthController'
    // })
    // .state('signup', {
    //   url: '/signup',
    //   templateUrl: 'app/auth/signup.html',
    //   controller: 'AuthController'
    // })
    .state('giphy', {
      url: '/giphy',
      templateUrl: 'app/giphy/giphy.html',
      controller: 'GiphyController',
      authenticate: true
    });

    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    // $httpProvider.interceptors.push('AttachTokens');
})
.controller('GiphyController', ['$scope', '$http', '$sanitize', 'urlprefix', 'urlparams', 
    function($scope, $http, $sanitize, urlprefix, urlparams) {

  $scope.change = function () {

    var searchstring = $scope.searchtext.split(' ').join('+');
    $http.get(urlprefix + $sanitize(searchstring) + urlparams).success( function(res) {
      $scope.gifs = res.data;
    });
  };

  $scope.save = function(index) {

      // var self = this;
      // var data = JSON.stringify($scope.gifs[this.index]);
      // var req = $http({
      //    method: 'POST',
      //    url: '/save',
      //    headers : { 'Content-Type': 'application/x-www-form-urlencoded' },
      //    data: data
      // });

      // req.success(function(html) {});
      

  };

}]);