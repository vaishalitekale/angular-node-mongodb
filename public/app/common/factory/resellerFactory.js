graspuApp.factory('resellerFactory', function($http, $rootScope, $location) {
    var resellerFactory = {};

    resellerFactory.getAllResellers = function(callback) {
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



    resellerFactory.deleteResellers = function(reseller, callback) {
        console.log("reseller deleating is ", reseller);
        $http({
                url: $rootScope.API_URL + '/deletereseller',
                method: "POST",
                data: reseller
            })
            .then(function(response) {
                    console.log("delete reseller response - ", response);
                    callback(null, response);
                },
                function(response) { // optional
                    console.log("err delete reseller - ", response);
                    callback(response, null);
                });
    };


    return (resellerFactory);
});