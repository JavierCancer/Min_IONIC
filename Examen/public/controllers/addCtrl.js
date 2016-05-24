
angular.module('SocialDrone').controller('addCtrl', function ($scope, $http) {
    var base_url = "http://localhost:8080";
    $scope.newSubject = {};
    $scope.addSubject = function () {
        $http.post(base_url+'/subject',{
            username: $scope.newSubject.name
        }).success(function (data) {
                var myAlert = $alert({
                    title: 'All good!',content:'Welcome '+$scope.newUser.username, container:'#alerts-container',
                    placement: 'top', duration:3, type: 'success', show: true});
                getUsers();
                $scope.newSubject.name=null;
            })
            .error(function (error, status, headers, config) {
                console.log(error);
                var myAlert = $alert({
                    title: 'Error!', content: error, container:'#alerts-container',
                    placement: 'top', duration:3, type: 'danger', show: true});
                console.log(myAlert);
            });
    };
});