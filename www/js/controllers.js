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

// Category controller
.controller('CategoryCtrl', function($scope,Product,$state,$http,$ionicLoading,$stateParams) {
  	$ionicLoading.show({template: '<ion-spinner icon="crescent"></ion-spinner>'});
	
	var category_name = $stateParams.category_id;
	var action = "all_product";
	var orderby = "date";
	var category = category_name;
  	var data_parameters = "action="+action+ "&orderby="+orderby+ "&category="+category;
	$http.post(globalurl,data_parameters, {
		headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
	})
	.success(function(response) {
		$ionicLoading.hide();
		if(response[0].status == "Y"){
			$scope.response = response;
		}
		else{
			$scope.response = "no";
		}
	});
})

// Product detail controller
.controller('DetailCtrl', function($scope,Product,$stateParams,$state,$http,$ionicLoading) {
	$ionicLoading.show({template: '<ion-spinner icon="crescent"></ion-spinner>'});
	
	var product_id = $stateParams.product_id;
  	var action = "get_product_detail";
	
  	var data_parameters = "action="+action+ "&product_id="+product_id;
	$http.post(globalurl,data_parameters, {
		headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
	})
	.success(function(response) {
		$ionicLoading.hide();
		if(response[0].status == "Y"){
			$scope.response = response;
			$scope.p_id = response[0].p_id;
			$scope.p_name = response[0].p_name;
			$scope.p_image = response[0].p_image_url;
			$scope.p_price = response[0].p_price;
			$scope.p_sale_price = response[0].p_price;
			$scope.p_description = response[0].p_deas;
		}
	});
	
})

// Cart controller
.controller('CartCtrl', function($scope,$http,ngCart,$ionicPopup,$state) {
	$scope.checklogin = function(){
		
		if(global_login_id != ""){
			ngCart.setTaxRate(0);
			ngCart.setShipping(0); 	
			$state.go('checkout');
		}
		else{
			$state.go('login');
		}
	}
})

// Checkout Controller, process checkout steps here
.controller('CheckoutCtrl', function($scope) {
	
		
})

// History Controller, process checkout steps here
.controller('HistoryCtrl', function($scope) {})


.controller('setting', function($scope,$stateParams,$http,$ionicPopup){
	$scope.user = {
			opassword : '',
			npassword : '',
			cpassword : ''
	};
	
	$scope.changepassword = function(user){
		var oldpass = user.opassword;
		var newpass = user.npassword;
		var confirmpass = user.cpassword;

		var slocid = localStorage.getItem("slocid");
		var orgid = localStorage.getItem("orgid");
		var userid = localStorage.getItem("userid");
		
		if(oldpass != "" && newpass != "" && confirmpass != ""){
			if(newpass != confirmpass){
				$ionicPopup.show({
					  template: '',
					  title: "New & Confirm password didn't match",
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
				var data_parameters = "slocid="+slocid+ "&orgid="+orgid+ "&id="+userid+ "&userid="+userid+ "&oldpass="+oldpass+ "&newpass="+newpass;
				$http.post("http://"+globalip+"/change_password",data_parameters,{
					headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
				})
				.success(function(response) {
					if(response[0].status != "N"){
						$ionicPopup.show({
							  template: '',
							  title: "Password changed successfully",
							  scope: $scope,
							  buttons: [
								{ 
								  text: 'Ok',
								  type: 'button-calm'
								},
							  ]
						})
						$scope.user = {
								opassword: '',
								npassword : '',
								cpassword : ''
						};
					}
					else{
						$ionicPopup.show({
							  template: '',
							  title: "Old password is wrong",
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
		}
		else{
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
