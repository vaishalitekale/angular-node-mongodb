graspuApp.controller('ClientCtrl', ['$scope', 'authToken', '$state', '$http','$rootScope','clientFactory', function ($scope, authToken, $state, $http,$rootScope, clientFactory) {
    $scope.logout = function () {
        console.log("I am in logout");
        authToken.removeToken();
        $state.go('login');
    };
    clientFactory.getAllResellers(function(err, response){
        if(err) {
            console.log("Error during getAllResellers - ", err);
        } else {
            console.log("getAllResellers - ", response);
            $scope.resellers = response.data;
        }
        
    });
}]);