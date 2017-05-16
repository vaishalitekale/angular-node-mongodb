graspuApp.config(function($urlRouterProvider, $stateProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('register', {
      url: '/register',
      templateUrl: '/app/template/register.html',
      controller: 'RegisterCtrl'
    })
    .state('login', {
      url: '/',
      templateUrl: '/app/template/login.html',
      controller: 'LoginCtrl'
    })

    .state('main', {
      url: '/home',
      templateUrl: '/app/template/home.html',
      controller: 'HomeCtrl'
    })

    .state('reseller', {
      url: '/reseller',
      templateUrl: '/app/template/reseller.html',
      controller: 'ResellerCtrl'
    })
    .state('listreseller', {
      url: '/listreseller',
      templateUrl: '/app/template/listreseller.html',
      controller: 'ListResellerCtrl'
    })

    .state('listclient', {
      url: '/listclient',
      templateUrl: '/app/template/listClient.html',
      controller: 'ClientCtrl'
    })

    .state('addclient', {
      url: '/addclient',
      templateUrl: '/app/template/addClient.html',
      controller: 'AddClientCtrl'
    })


    .state('lessons', {
      url: '/lessons',
      templateUrl: '/app/template/listLeasons.html',
      controller: 'ListLeasonsCtrl'
    }).state('addleasons', {
      url: '/addleasons',
      templateUrl: '/app/template/addLeasons.html',
      controller: 'AddLeasonsCtrl'
    });



  $httpProvider.interceptors.push('authInterceptor');
}).run(["$rootScope", "$location",
  function($rootScope, $location) {
    console.log("$location.port(); - ", $location.protocol());
    console.log("$location.host(); - ", $location.host());
    console.log("$location.port(); - ", $location.port());
    $rootScope.API_URL = $location.protocol() + '://' + $location.host() + ':' + $location.port();
    if ($location.host() == 'localhost') {
      $rootScope.DB_URL = 'mongodb://localhost/graspu5';
    } else {
      $rootScope.DB_URL = 'mongodb://graspuuser:noguess21@ds115411.mlab.com:15411/graspu';
    }

  }
]);
