/**
 * Created by bernat on 25/03/16.
 */

angular.module('SocialDrone',['ngRoute', 'mgcrea.ngStrap','ngAnimate']).config(function ($routeProvider, $locationProvider) {
//    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});