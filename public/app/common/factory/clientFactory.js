graspuApp.factory('clientFactory', function($http, $rootScope, $location) {
    var clientFactory = {};

    clientFactory.getAllClients = function(callback) {
        //get client
        $http({
                url: $rootScope.API_URL + '/getclient',
                method: "GET"
            })
            .then(function(response) {
                    console.log("result - ", response);
                    callback(null, response);
                },
                function(response) { // optional
                    console.log("err - ", response);
                    if (response.status == 401) {
                        $location.path("/login");
                    }
                    callback(response, null);
                });

    };

    clientFactory.getResellers = function(callback) {
        //console.log("Inside factory");
        $http({
                url: $rootScope.API_URL + '/reseller',
                method: "GET"
            })
            .then(function(response) {
                    //console.log("result - ", response);
                    callback(null, response);
                },
                function(response) { // optional
                    console.log("err - ", response);
                    if (response.status == 401) {
                        $location.path("/login");
                    }
                    callback(response, null);
                });
    };

    clientFactory.getClientResellers = function(data, callback) {
        //console.log("Inside factory");
        $http({
                url: $rootScope.API_URL + '/getclient/' + data,
                method: "GET"
            })
            .then(function(response) {
                    //console.log("result - ", response);
                    callback(null, response);
                },
                function(response) { // optional
                    console.log("err - ", response);
                    if (response.status == 401) {
                        $location.path("/login");
                    }
                    callback(response, null);
                });
    };


    clientFactory.createClient = function(data, callback) {
        //create client
        $http({
                url: $rootScope.API_URL + '/addclient',
                method: "POST",
                data: data
            })
            .then(function(response) {
                    //console.log("result - ", response);
                    callback(null, response);
                },
                function(response) { // optional
                    console.log("err - ", response);
                    callback(response, null);
                });
    }

    clientFactory.deleteClient = function(data, callback) {
        //create client
        $http({
                url: $rootScope.API_URL + '/deleteclient/' + data,
                method: "DELETE"
            })
            .then(function(response) {
                    //console.log("result - ", response);
                    callback(null, response);
                },
                function(response) { // optional
                    console.log("err - ", response);
                    callback(response, null);
                });
    }

    return (clientFactory);
});