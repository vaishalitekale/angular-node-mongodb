graspuApp.service('fileUpload', ['$http', '$rootScope', function($http, $rootScope, $location) {
    this.uploadFileToUrl = function(profileImage, companyLogo, reseller, callback) {
        var fd = new FormData();
        console.log("reseller - ", reseller);
        fd.append('profileImage', profileImage);
        fd.append('companyLogo', companyLogo);
        fd.append('reseller', angular.toJson(reseller));
        fd.append('page_id', 'dataname');

        $http.post($rootScope.API_URL + '/addreseller', fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).then(function(response) {
                console.log("result - ", response);
                callback(null, response);
            },
            function(err) { // optional
                console.log("err - ", err);
                if (err.status == 401) {
                    $location.path("/login");
                }
                callback(err, null);
                //callback(response, null);
            });
    };

    this.uploadClientToUrl = function(profileImage, companyLogo, client, callback) {
        var fd = new FormData();
        console.log("reseller - ", client);
        fd.append('profileImage', profileImage);
        fd.append('companyLogo', companyLogo);
        fd.append('client', angular.toJson(client));
        fd.append('page_id', 'dataname');

        $http.post($rootScope.API_URL + '/addclient', fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).then(function(response) {
                console.log("result - ", response);
                callback(null, response);
            },
            function(err) { // optional
                console.log("err - ", err);
                if (err.status == 401) {
                    $location.path("/login");
                }
                callback(err, null);
                //callback(response, null);
            });
    };
}]);