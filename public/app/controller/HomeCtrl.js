graspuApp.controller('HomeCtrl', ['$scope', 'authToken', '$state', '$http', '$rootScope', '$location', 'dataShareService', '$window',
  function($scope, authToken, $state, $http, $rootScope, $location, dataShareService, $window) {

    var storage = $window.localStorage;
    var isReseller = storage.getItem('isReseller');
    console.log("isReseller from storate ", isReseller);
    if (isReseller == 'true') {
      console.log(" this is isReseller from storate ", isReseller);
      $scope.showResellerMenu = false;

    } else {
      console.log(" this is NOT isReseller from storate ", isReseller);
      $scope.showResellerMenu = true;
    }

    if (storage.getItem('userToken') == null) {
      $location.path('/login');
    }
    $scope.logout = function() {
      console.log("I am in logout");
      authToken.removeToken();
      $state.go('login');
    };
    console.log("I am in HomeCtrl");
    dataShareService.Menu = "Home";
    $scope.serviceClicked = function(service) {
      console.log("service clicked ", service);
      console.log("dataShareService.Menu before ", dataShareService.Menu);
      dataShareService.Menu = service;
      console.log("dataShareService.Menu after ", dataShareService.Menu);

    };

    $scope.$watch(function() {
        return dataShareService.isReseller;
      },
      function(newVal, oldVal) {
        console.log("dataservice isReseller value - ", newVal, oldVal);
        if (newVal === true) {
          console.log("Hiding header reseller");
          $scope.showResellerMenu = false;
        } else {
          $scope.showResellerMenu = true;
        }
        //$scope.activeMenu = dataShareService.Menu;
      }, true);

    // $scope.getResellers = function () {
    //     // $http.get($rootScope.API_URL+"/resellers").then(function (jobs) {
    //     //     $scope.jobs = jobs;
    //     // }).catch(function (err) {
    //     //     console.log("err during httpRequest", err.data.message);
    //     //     if (err.data.message == 'session expired') {
    //     //         alert("Session expired please login again");
    //     //         authToken.removeToken();
    //              $state.go('reseller');
    //     //     }
    //     // });
    // };
  }
]);
