
graspuApp.factory('authToken',['$window',function($window){
	var storage = $window.localStorage;
	//Cached token would allow us to jave token in memory without having to load it from local storage
	var cachedToken;
	var userToken = 'userToken';
	var authToken =  {  
		setToken: function(token , callback){
			cachedToken = token;
			// on top of setting the cachedToken Also store in local storage, and in case that the 
			// cachedToken is not set upon pageRefresh .. we will load it from local storage
            console.log('setting token ', token);
			storage.setItem(userToken,token);
            callback(null, 'done');
		},
		getToken:function(){
			// getToken will check if cachedToken not set then  it will get it from localStroage
			if(!cachedToken){
				cachedToken = storage.getItem(userToken);
			}
			return cachedToken;
		},
		isAuthenticated: function(){
			// this function just checks if we have our token
			// !! takes the result, cast it to a boolean and then inverses it
			// in this case it will return true if we get something from get token
			return !!authToken.getToken();
		},
		removeToken: function(){
			cachedToken = null;
			storage.removeItem(userToken);
			storage.removeItem('isReseller');
		}
	}

	return authToken;
}]);