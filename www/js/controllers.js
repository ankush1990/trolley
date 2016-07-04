/**
 * @author: Duy Thanh DAO
 * @email: success.ddt@gmail.com
 */
var global_login_id = "";

angular.module('starter.controllers', [])

.controller('LogoutCtrl', function($scope,$rootScope,$ionicHistory) {
	$scope.login = "";
	
	$rootScope.$on('login_var', function (event, args) {
		$scope.login = args.global_login;
		global_login_id = args.global_login;
	});
	
	$scope.logout = function(){
		$ionicHistory.clearCache();
		login_var = "";
		$rootScope.$broadcast('login_var',{global_login:login_var});
	}
})

// Home controller
.controller('HomeCtrl', function($scope,$ionicLoading) {
  // slider images
  
	$scope.mapCreated = function(map) {
		$scope.map = map;
	};
})

// Home controller
.controller('ContactCtrl', function($scope,$ionicLoading) {
  // slider images
  	$scope.showwebsitelink = function(url){
		//console.log(url);
		var ref = window.open(url,'_blank','location=no'); 
		return false;
	}
})

// Authentication controller
// Put your login, register functions here
.controller('AuthCtrl', function($scope,$ionicHistory,$rootScope,$http,$ionicPopup,$state) {
	$scope.user = {username: '',password : ''};
    // hide back butotn in next view
	$ionicHistory.nextViewOptions({
      	disableBack: true
    });
	
	
   	$scope.signIn = function(user) {
		var username = user.username;
		var password = user.password;
		
		
		if(typeof username === "undefined" || typeof password === "undefined" || username == "" || password == ""){
			$ionicPopup.show({
			  template: '',
			  title: 'Please fill all fields',
			  scope: $scope,
			  buttons: [
				{ 
				  text: 'Ok',
				  type: 'button-assertive'
				},
			  ]
			})
		}
		else{
			var action = "login";
			var data_parameters = "action="+action+"&username="+username+ "&password="+password;
			$http.post(globalurl,data_parameters, {
				headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(response) {
				if(response[0].status == "Y"){
					$rootScope.$broadcast('login_var',{global_login:response[0].result.user_id});
					$state.go('home');
				}
				else{
					$ionicPopup.show({
					  template: '',
					  title: 'Username or password is wrong',
					  scope: $scope,
					  buttons: [
						{
						  text: 'Ok',
						  type: 'button-assertive'
						},
					  ]
					})
				}
			});
		}
	};
});


