graspuApp.factory('authInterceptor', ['authToken', function(authToken){
	console.log("I am in authInterceptor");
	return{
		request:function(config){
			var token = authToken.getToken();
			if(token){
				config.headers.Authorization = 'Bearer '+ token;
			}
			return config;
		},
		response:function(response){
			return response;
		}
	};
}])