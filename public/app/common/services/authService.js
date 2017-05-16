graspuApp.service('auth', ['$http', 'authToken', '$state', '$window', '$rootScope',
    function($http, authToken, $state, $window, $rootScope) {
        // function authSuccessfull(res) {
        //     authToken.setToken(res.token);
        //     //$state.go('main');
        // }
        console.log("API_URL in service - ", $rootScope.API_URL);

        this.login = function(email, password, callback) {
            console.log("email - ", email, "pass - ", password);
            return $http.post($rootScope.API_URL + '/login', {
                email: email,
                password: password
            }).then(function(res) {
                authToken.setToken(res.data.token, function(err, done) {
                    callback(null, res);
                });
            }).catch(function(err) {
                //console.log("err in login", err);
                callback(err, null);
            });
        };


        this.register = function(email, password, callback) {
            console.log("email - ", email, "pass - ", password);
            return $http.post($rootScope.API_URL + '/register', {
                email: email,
                password: password
            }).then(function(res) {
                console.log("res - ", res.data);
                authToken.setToken(res.data.token, function(err, done) {
                    callback(null, res);
                });
            }).catch(function(err) {
                console.log("err in register");
            });
        };
    }
]);