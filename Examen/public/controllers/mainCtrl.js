

angular.module('SocialDrone').controller('MainCtrl', function ($scope, $http,$alert) {
    var base_url = "http://localhost:8080";
    $scope.subject = {};
    $scope.newStudent={};
    $scope.info1 ={};
    $scope.info2 ={};
    $scope.tele ={};

    function getSubject() {
        $http.get(base_url + '/subject')
            .success(function (data) {
                console.log(data);
                $scope.subject = data;
                console.log($scope.subject);
            })
            .error(function (err) {
            });
    }
    $scope.getInfo = function(id){
        console.log(id);
        $http.get(base_url + '/subject/' +id)
            .success(function (data) {
                console.log(data);
                $scope.info1 = data;
                $scope.info2 = data.students;
                console.log($scope.info2);
            })
            .error(function (err) {
            });
    }
    $scope.tlf = function(tle){
        console.log(tle.phones);
        $scope.tele = tle.phones;
    }
    getSubject();
    $scope.addStud= function () {
       console.log($scope.newUser);
        $http.post(base_url+'/subject/' + $scope.newStudent.subject,{
            name: $scope.newStudent.name,
            address: $scope.newStudent.address,
            place: $scope.newStudent.place,
            tlf: $scope.newStudent.tlf,
        }).success(function (data) {
                var myAlert = $alert({
                    title: 'All good!',content:'Welcome '+$scope.newStudent.name, container:'#alerts-container',
                    placement: 'top', duration:3, type: 'success', show: true});
                $scope.newStudent.name=null;
                $scope.newStudent.address=null;
                $scope.newStudent.place=null;
                $scope.newStudent.tlf=null;
                $scope.newStudent.subject=null;
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