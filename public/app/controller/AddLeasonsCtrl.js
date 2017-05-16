graspuApp.controller('AddLeasonsCtrl', ['$scope', 'auth', '$state', 'dataShareService', 'lessonFactory', '$window',
  function($scope, auth, $state, dataShareService, lessonFactory, $window) {
    $scope.lesson = {
      title: null,
      lessonType: null,
      state: null,
      attempts: null,
      passingGrades: null,
      resource: null
    };


    $scope.lessonType = {
      availableOptions: [{
        id: '1',
        name: 'Audio'
      }, {
        id: '2',
        name: 'Video'
      }, {
        id: '3',
        name: 'Document'
      }] //This sets the default value of the select in the ui
    };

    $scope.state = {
      availableOptions: [{
        id: '1',
        name: 'Yes'
      }, {
        id: '2',
        name: 'No'
      }] //This sets the default value of the select in the ui
    };

    $scope.attempts = {
      availableOptions: [{
        id: '1',
        name: '1'
      }, {
        id: '2',
        name: '2'
      }, {
        id: '3',
        name: '3'
      }, {
        id: '4',
        name: '4'
      }, {
        id: '5',
        name: '5'
      }] //This sets the default value of the select in the ui
    };

    $scope.updatestateBill = function() {
      console.log("Inside updatestateBill", $scope.lessonType.selectedOption);
      $scope.lesson.lessonType = $scope.lessonType.selectedOption.name;
    };
    $scope.updatePublishedState = function() {
      console.log("Inside updatePublishedState", $scope.state.selectedOption);
      $scope.lesson.state = $scope.state.selectedOption.name;
    };
    $scope.updateAttempts = function() {
      console.log("Inside updateAttempts", $scope.attempts.selectedOption);
      $scope.lesson.attempts = $scope.attempts.selectedOption.name;
    };
    $scope.createlesson = function() {
      console.log("I am in create leason");
      console.log("$scope.lessonForm.$valid - ", $scope.lessonForm.$valid);
      $scope.submitted = true;
      if ($scope.lessonForm.$valid) {
        console.log("$scope.lesson", $scope.lesson);
        lessonFactory.createLesson($scope.lesson, function(err, response) {
          if (err) {
            $state.go('lessons');
            var notify = {
              type: 'error',
              title: 'Error during adding lesson',
              timeout: 3000 //time in ms
            };
            $scope.$emit('notify', notify);
          } else {
            console.log("lesson successfully created", response);
            $state.go('lessons');
            var notify = {
              type: 'success',
              title: 'Lesson added successfully',
              content: 'Lesson name: ' + $scope.lesson.title,
              timeout: 3000 //time in ms
            };
            $scope.$emit('notify', notify);
          }
        });
      } else {
        $window.scrollTo(0, 0);
      }
    };

    $scope.$watch(function() {
        return dataShareService.editableLesson;
      },
      function(newVal, oldVal) {
        console.log("value changed - ", newVal, oldVal);
        $scope.client = newVal;
        if (newVal === null && oldVal === null) {
          $scope.editableMode = false;
          $scope.client = {
            title: null,
            lessonType: null,
            state: null,
            attempts: null,
            passingGrades: null,
            resource: null
          };
        } else {
          $scope.editableMode = true;
        }
      }, true);
  }
]);
