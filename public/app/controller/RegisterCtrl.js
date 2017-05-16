graspuApp.controller('RegisterCtrl', ['$scope', 'auth', '$state', function($scope, auth, $state) {
  $scope.username = {
    "email": "",
    "password": ""
  };
  $scope.createAccount = function() {
    console.log("username is - ", $scope.username.email);
    console.log("username is - ", $scope.username.password);
    auth.register($scope.username.email, $scope.username.password, function(err, res) {
      console.log("err-", err, "res - ", res);
      if (err) {
        console.log("err - ", err);
      } else {
        $state.go('main');
        var notify = {
          type: 'success',
          title: 'Registeration successfull',
          timeout: 3000 //time in ms
        };
        $scope.$emit('notify', notify);
      }
    });
    // .then(function(err, res){
    // 	console.log("err-",err,"res - ", res );
    // 	//alert('success', 'Account Created '+ ' Welcome, '+ res.user.email+'!',2000);
    // });
  };


}]);
