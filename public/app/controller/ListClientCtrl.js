graspuApp.controller('ClientCtrl', ['$scope', 'authToken', '$state', '$http', '$rootScope', '$location', 'clientFactory', 'dataShareService', '$window',
  function($scope, authToken, $state, $http, $rootScope, $location, clientFactory, dataShareService, $window) {
    dataShareService.Menu = "Client";
    $scope.sortType = 'firstName'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.showLoader = true;
    $scope.logout = function() {
      console.log("I am in logout");
      authToken.removeToken();
      $state.go('login');
    };

    if (localStorage.getItem('isReseller')) {
      if (localStorage.getItem('isReseller') == 'true') {
        $scope.visible = false;
      } else {
        $scope.visible = true;
      }
    }

    if (localStorage.getItem('userToken') == null) {
      $location.path('/login');
    }
    $scope.addClient = function() {
      dataShareService.editableClient = null;

      $state.go('addclient');
      $window.scrollTo(0, 0);
    };
    clientFactory.getAllClients(function(err, response) {
      if (err) {
        console.log("Error during getAllResellers - ", err);
      } else {
        console.log("getAllClients - ", response);
        $scope.clients = response.data;
        $scope.showLoader = false;
      }
    });


    // define list of items
    clientFactory.getResellers(function(err, response) {
      if (err) {
        console.log(err);
      } else {
        response.data.push({
          '_id': localStorage.getItem('_id'),
          'firstName': 'Admin',
          'lastName': ' '
        });
        $scope.resellerList = response.data.reverse();
      }
    });

    // initialize filter object
    $scope.filter = {};
    $scope.changeFilter = function(reseller) {
      $scope.showLoader = true;
      clientFactory.getClientResellers(reseller, function(err, response) {
        if (err) {
          console.log(err);
        } else {
          $scope.clients = response.data;
          $scope.showLoader = false;
        }
      });
    }
    $scope.deleteClient = function(client) {
      if ($window.confirm("Are you sure to want to delete?")) {
        clientFactory.deleteClient(client._id, function(err, response) {
          if (err) {
            console.log("Error during deleteResellers - ", err);
            var notify = {
              type: 'error',
              title: 'Error while deleting client, please try again later',
              timeout: 3000 //time in ms
            };
            $scope.$emit('notify', notify);
          } else {
            console.log("getAllResellers - ", response);
            var notify = {
              type: 'info',
              title: 'Client deleted successfully',
              timeout: 3000 //time in ms
            };
            $scope.$emit('notify', notify);
            clientFactory.getAllClients(function(err, response) {
              if (err) {
                console.log("Error during getAllResellers - ", err);
              } else {
                console.log("getAllClients - ", response);
                $scope.clients = response.data;

              }
            });
          }
        });
      }

    };

    $scope.editClient = function(client) {
      console.log("Editing client ", client);
      dataShareService.editableClient = client;
      $state.go('addclient');
      $window.scrollTo(0, 0);
    };
  }
]);
