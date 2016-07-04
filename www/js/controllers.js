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
		var ref = window.open(url,'_blank','location=no'); 
		return false;
	}
})

