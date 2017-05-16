graspuApp.factory('lessonFactory', function($http, $rootScope, $location) {
  var lessonFactory = {};

  lessonFactory.getAllLessons = function(page, callback) {
    //console.log("Inside factory");
    console.log(page);
    $http({
        url: $rootScope.API_URL + '/lesson/' + page,
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
  lessonFactory.createLesson = function(lesson, callback) {
    console.log("lesson creating is ", lesson);
    $http({
        url: $rootScope.API_URL + '/lesson',
        method: "POST",
        data: lesson
      })
      .then(function(response) {
          console.log("delete lesson response - ", response);
          callback(null, response);
        },
        function(response) { // optional
          console.log("err delete lesson - ", response);
          callback(response, null);
        });
  };

  lessonFactory.deleteLesson = function(lesson, callback) {
    console.log("lesson deleating is ", lesson);
    $http({
        url: $rootScope.API_URL + '/lesson/' + lesson,
        method: "DELETE",
      })
      .then(function(response) {
          console.log("delete lesson response - ", response);
          callback(null, response);
        },
        function(response) { // optional
          console.log("err delete lesson - ", response);
          callback(response, null);
        });
  };




  return (lessonFactory);
});
