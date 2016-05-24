
angular.module('SocialDrone').controller('messageCtrl', function ($scope, $http,$alert) {
    alertify.confirm
    $scope.messages = {};
    $scope.newMessage = {};
    function getMessages(){
    $http.get("http://localhost:8080/subject") //hacemos get de todos los users
        .success(function(data){
            console.log(data);
            $scope.messages= data;
        })
        .error(function(err){
            var myAlert = $alert({
                title: 'Error!', content: error, container:'#alerts-container',
                placement: 'top', duration:3, type: 'danger', show: true});
        });
    };
    getMessages();
    $scope.enviarMensaje = function() {
        $http.post("http://localhost:8080/message", {
                username: $scope.newMessage.user,
                text: $scope.newMessage.message
            })
            .success(function (data, status, headers, config) {
                getMessages();
            })
            .error(function (error, status, headers, config) {
                console.log(error);
            });
    };
    $scope.borrarMensaje = function (id) {
        Alertify.confirm('Are you sure?').then(function () {
            $http.delete("http://localhost:8080/message/" + id, {})
                .success(function (data, status, headers, config) {
                    getMessages();
                })
                .error(function (error, status, headers, config) {
                    console.log(error);
                    var myAlert = $alert({
                        title: 'Error!', content: error, container: '#alerts-container',
                        placement: 'top', duration: 3, type: 'danger', show: true
                    });
                });
        });
    }
    $scope.updateMensaje = function(id) {
        $http.put("http://localhost:8080/message/"+$scope.messages[$scope.messages.length-1]._id, {
                username: $scope.newMessage.user,
                text: $scope.newMessage.message
            })
            .success(function (data, status, headers, config) {
                getMessages();
            })
            .error(function (error, status, headers, config) {
                console.log(error);
            });
    };
});