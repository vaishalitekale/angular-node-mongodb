graspuApp.controller('headerCtrl', ['$scope', 'authToken', '$state', '$http', '$rootScope', 'clientFactory', 'dataShareService', '$window',
  function($scope, authToken, $state, $http, $rootScope, clientFactory, dataShareService, $window) {
    $scope.logout = function() {
      console.log("I am in logout");
      authToken.removeToken();
      dataShareService.showHeader = false;
      $state.go('login');
      var notify = {
        type: 'info',
        title: 'Logged out successfully',
        timeout: 3000 //time in ms
      };
      $scope.$emit('notify', notify);
    };

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
    // if (isReseller === 'true') {
    //     return true;
    // } else {
    //     return false;
    // }

    $scope.menuClicked = function(state, activeMenu) {
      $scope.activeMenu = activeMenu;
      console.log(state);
      $state.go(state);
    }

    $scope.sharedData = dataShareService;
    // console.log("$scope.sharedData - ", $scope.sharedData);
    $scope.$watch(function() {
        return dataShareService.Menu;
      },
      function(newVal, oldVal) {
        console.log(newVal, oldVal);
        $scope.activeMenu = dataShareService.Menu;
      }, true);

    $scope.$watch(function() {
        return dataShareService.showHeader;
      },
      function(newVal, oldVal) {
        console.log(newVal, oldVal);
        $scope.activeMenu = dataShareService.Menu;
      }, true);

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

  }
]);
