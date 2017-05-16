graspuApp.service('dataShareService', ['$http', 'authToken', '$state', '$window', '$rootScope', '$location',
  function($http, authToken, $state, $window, $rootScope, $location) {
    var storage = $window.localStorage;
    console.log("I am in service", $location.url());
    let current = $state.current.name;
    //console.log("$state.current.name - ", $location.url() == '/'   );
    var sharedData = {
      showHeader: toShowURL(),
      Menu: 'Home',
      editableReseller: null,
      isReseller: isReseller(),
      editableClient: null,
      editableLesson: null
    };

    function isReseller() {
      var isReseller = storage.getItem('isReseller');
      if (isReseller === 'true') {
        return true;
      } else {
        return false;
      }
    }

    function toShowURL() {
      var authenticated = authToken.isAuthenticated();
      console.log("authenticated - ", authenticated);
      var OnLoginPage = $location.url() == '/';
      console.log("notOnLoginPage - ", OnLoginPage);
      // !authToken.isAuthenticated() && $location.url() == '/'
      if (authenticated && !OnLoginPage) {
        console.log(true);
        return true;
      } else {
        console.log(false);
        return false;
      }
    }
    return sharedData;
  }
]);
