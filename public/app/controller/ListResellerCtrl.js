graspuApp.controller('ListResellerCtrl', ['$scope', 'authToken', '$state', '$http', '$rootScope', 'dataShareService', 'resellerFactory', '$window',
    function($scope, authToken, $state, $http, $rootScope, dataShareService, resellerFactory, $window) {
        console.log("I am in ListResellerCtrl");
        dataShareService.Menu = "Reseller";
        $scope.sortType = 'firstName'; // set the default sort type
        $scope.sortReverse = false; // set the default sort order
        $scope.showLoader = true;
        // getResults(1);
        // $scope.pageChanged = function(newPage) {
        //   getResults(newPage);
        // };

        // function getResults(pageNumber) {
        //   $scope.showLoader = true;
        //   $scope.resellers = [];
        //   resellerFactory.getAllResellers(pageNumber, function(err, response) {
        //     if (err) {
        //       console.log("Error during getAllResellers - ", err);
        //     } else {
        //       console.log("getAllResellers - ", response);
        //       $scope.resellers = response.data;
        //       $scope.showLoader = false;
        //     }
        //   });

        // }


        resellerFactory.getAllResellers(function(err, response) {
            if (err) {
                console.log("Error during getAllResellers - ", err);
            } else {
                console.log("getAllResellers - ", response);
                $scope.resellers = response.data;
                $scope.showLoader = false;
            }
        });

        $scope.addReseller = function() {
            $state.go('reseller');
            dataShareService.editableReseller = null;
            $window.scrollTo(0, 0);
        };

        $scope.deleteReseller = function(reseller) {
            //console.log("about to delete ", reseller);
            if ($window.confirm("Are you sure to want to delete?")) {
                resellerFactory.deleteResellers(reseller, function(err, response) {
                    if (err) {
                        console.log("Error during deleteResellers - ", err);
                        var notify = {
                            type: 'error',
                            title: 'Error while deleting the reseller, please try again later',
                            timeout: 3000 //time in ms
                        };
                        $scope.$emit('notify', notify);
                    } else {
                        var notify = {
                            type: 'info',
                            title: 'Reseller deleted successfully',
                            timeout: 3000 //time in ms
                        };
                        $scope.$emit('notify', notify);
                        console.log("getAllResellers - ", response);
                        resellerFactory.getAllResellers(function(err, response) {
                            if (err) {
                                console.log("Error during getAllResellers - ", err);
                            } else {
                                console.log("getAllResellers - ", response);
                                $scope.resellers = response.data;
                            }
                        });
                    }
                });
            }
        };

        $scope.editReseller = function(reseller) {
            console.log("Editing Reseller ", reseller);
            dataShareService.editableReseller = reseller;
            $state.go('reseller');
            $window.scrollTo(0, 0);
        };
    }
]);