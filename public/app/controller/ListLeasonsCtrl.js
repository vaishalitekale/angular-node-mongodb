graspuApp.controller('ListLeasonsCtrl', ['$scope', 'auth', '$state', '$window', 'dataShareService', 'lessonFactory',
    function($scope, auth, $state, $window, dataShareService, lessonFactory) {
        $scope.sortType = 'firstName'; // set the default sort type
        $scope.sortReverse = false; // set the default sort order
        $scope.showLoader = true;
        $scope.addLeasons = function() {
            $state.go('addleasons');
        };
        getResults(1);
        $scope.pageChanged = function(newPage) {
            getResults(newPage);
        };

        function getResults(pageNumber) {
            $scope.showLoader = true;
            $scope.lessons = [];
            lessonFactory.getAllLessons(pageNumber, function(err, response) {
                if (err) {
                    console.log("Error during getAllLessons - ", err);
                } else {
                    console.log("getAllLessons - ", response);
                    $scope.lessons = response.data.data;
                    $scope.totalCount = response.data.totalCount;
                    $scope.showLoader = false;
                }
            });
        }



        $scope.deleteLesson = function(lesson) {
            if ($window.confirm("Are you sure to want to delete?")) {
                lessonFactory.deleteLesson(lesson._id, function(err, response) {
                    if (err) {
                        var notify = {
                            type: 'error',
                            title: 'Error while deleting the lesson, please try again later',
                            timeout: 3000 //time in ms
                        };
                        $scope.$emit('notify', notify);
                    } else {
                        var notify = {
                            type: 'info',
                            title: 'Lesson deleted successfully',
                            timeout: 3000 //time in ms
                        };
                        $scope.$emit('notify', notify);
                        lessonFactory.getAllLessons(function(err, response) {
                            if (err) {
                                console.log("Error during getAllLessons - ", err);
                            } else {
                                $scope.lessons = response.data.data;
                                $scope.totalCount = response.data.totalCount;
                            }
                        });
                    }
                });
            }

        };
    }
]);
