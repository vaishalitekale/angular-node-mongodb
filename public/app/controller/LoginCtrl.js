graspuApp.controller('LoginCtrl', ['$scope', 'auth', '$state', 'dataShareService', 'flashService', '$window',
  function($scope, auth, $state, dataShareService, flashService, $window) {
    var storage = $window.localStorage;
    $scope.username = {
      "email": "",
      "password": ""
    };

    $scope.submitLogin = function() {

      console.log("username is - ", $scope.username.email);
      console.log("username is - ", $scope.username.password);
      console.log("dataShareService is - ", dataShareService);
      $scope.submitted = true;
      if ($scope.loginForm.$valid) {
        auth.login($scope.username.email, $scope.username.password, function(err, res) {
          //console.log("err-", err, "res - ", res);
          if (err) {
            console.log("error------", err);
            if (err.data.message.message = "Missing credentials") {
              //flashService.Error('Please check your email or password');
              var notify = {
                type: 'error',
                title: 'Please check your email or password',
                timeout: 3000 //time in ms
              };
              $scope.$emit('notify', notify);
            }
            console.log("err - ", err);
          } else {
            console.log("response of login--------", res);
            localStorage.setItem('_id', res.data.user._id);
            if (res.data && res.data.user && res.data.user.userName) {
              console.log("This is a reseller");
              dataShareService.isReseller = true;
              storage.setItem('isReseller', 'true');
            } else {
              storage.setItem('isReseller', 'false');
              dataShareService.isReseller = false;
            }
            dataShareService.showHeader = true;
            $state.go('main');
            var notify = {
              type: 'success',
              title: 'Logged in successfully',
              timeout: 3000 //time in ms
            };
            $scope.$emit('notify', notify);
            $window.scrollTo(0, 0);
          }
        });
      }
    };
  }
]);
