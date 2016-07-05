// JavaScript Document
var global_location = "";

angular.module('starter.controllers', [])
.controller('MainCtrl', function($scope, $ionicSideMenuDelegate,$rootScope,$state) {
  $scope.attendees = [
    { firstname: 'Nicolas', lastname: 'Cage' },
    { firstname: 'Jean-Claude', lastname: 'Van Damme' },
    { firstname: 'Keanu', lastname: 'Reeves' },
    { firstname: 'Steven', lastname: 'Seagal' }
  ];
  
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})


.controller('driverCtrl', function($scope,$ionicPopup,$http) {
	
	// to get location name code
  	navigator.geolocation.getCurrentPosition(function (pos) {
		 var lat = pos.coords.latitude;
		 var long = pos.coords.longitude;
		 var geocoder = new google.maps.Geocoder();
		 var latlng = new google.maps.LatLng(lat, long);

			geocoder.geocode({ 'latLng': latlng }, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[1]) {
						global_location = results[1].formatted_address; // details address
					} else {
						console.log('Location not found');
					}
				} else {
					console.log('Geocoder failed due to: ' + status);
				}
			})
	}, function (error) {
		  alert('Unable to get location: ' + error.message);
	});
	
	$scope.login = function(user){
		var email = user.email;
		var password = user.password;
		var action = "login";
		if(typeof email === "undefined" || typeof password === "undefined" || email == "" || password == ""){
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
			var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z\-])+\.)+([a-zA-Z]{2,4})+$/;
			if(filter.test(email)){
				var data_parameters = "email="+email+ "&password="+password+ "&location="+global_location+ "&action="+action;
				$http.post(globalip,data_parameters, {
					headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
				})
				.success(function(response) {
					if(response.result != "unsuccessful"){
						$ionicPopup.show({
						  template: '',
						  title: "success",
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
						$ionicPopup.show({
						  template: '',
						  title: "Wrong email or password",
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
			else{
				$ionicPopup.show({
				  template: '',
				  title: "Enter Valid email",
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
	}
})

.controller('WebCtrl', function($scope,$ionicLoading) {
  // slider images
  	$scope.showwebsitelink = function(url){
		//console.log(url);
		//var ref = window.open(url,'_blank','location=no'); 
		var ref = window.open(url,'_blank','location=no'); 
		return false;
	}
})

.controller('ScheduleCtrl', function($scope,$ionicPopup) {
  	var data = [{"id":"1","name": "The Trolley Depot [Park and Ride]"},{"id":"2","name": "Mister Ps Restaurant"},{"id":"3","name": "The Ellijay Board Walk"},{"id":"4","name": "The Ellijay Train Station"},{"id":"5","name": "Southern Flare Antiques"},{"id":"6","name": "Best Western Hotel"},{"id":"7","name": "Mountain Oasis"}];
	

  	$scope.response = data;
})


.controller('scheduleCtrl', function($scope,$stateParams,$rootScope) {
	$scope.title = $stateParams.name;
	if($stateParams.id == "1"){
		$scope.content = "The home of the Trolleys! Buy your tickets here as well as tshirts, trolley toys, and other cool craft items at Nancyfangles Gallery Gift Shop. The depot is also a Venue for Birthday Parties, Wedding events including showers, and receptions. Park and ride the Ellijay Trolley from here! 11:00am, Noon, 1pm, 2pm Last pickup. 5pm, 6pm Last Pickup";
	}
	if($stateParams.id == "2"){
		$scope.content = "The best burgers and fries in Ellijay! Hop on, have lunch, we'll pick you up... 11:08am, 12:08pm, 1:08pm, 2:08pm Last pickup. 5:08pm, 6:08pm Last pickup";
	}
	if($stateParams.id == "3"){
		$scope.content = "Central to Ellijay Shopping and restaurants, the Ellijay Boardwalk is a great place to hop on or hop off. Don't worry, we'll swing back around and pick you up! 11:15am, 12:15pm, 1:15pm, 2:15pm Last pickup. 5:15 pm, 6:15pm Last pickup ";
	}
	if($stateParams.id == "4"){
		$scope.content = "11:25am, 12:25pm, 1:25pm, 2:25pm Last pickup. 5:25pm, 6:25pm Last pickup. ";
	}
	if($stateParams.id == "5"){
		$scope.content = "One of Ellijay's most exclusive antique stores. Jump out and look around. We've got room to carry what you buy! 11:30am, 12:30pm, 1:30pm, 2:30pm Last pickup. 5:30pm, 6:30pm Last pickup. ";
	}
	if($stateParams.id == "6"){
		$scope.content = "The best view in Ellijay comes from The Best Western Hotel. Also one of our Vineyard tour partners! 11:38am, 12:38pm, 1:38pm, 2:38pm Last pickup. 5:38pm, 6:38pm Last pickup. ";
	}
	if($stateParams.id == "7"){
		$scope.content = "11:48am, 12:48pm, 1:48pm, 2:48pm Last pickup.";
	}
})


.controller('CheckinCtrl', function($scope,$cordovaGeolocation,$ionicPopup) {
	
	$scope.mapCreated = function(map) {
		$scope.map = map;
	};
	
	$scope.centerOnMe = function () {
		console.log("Centering");
		if (!$scope.map) {
		  return;
		}
	
		$scope.loading = $ionicLoading.show({
		  content: 'Getting current location...',
		  showBackdrop: false
		});
	
		navigator.geolocation.getCurrentPosition(function (pos) {
		  console.log('Got pos', pos);
		  $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
		  $scope.loading.hide();
		}, function (error) {
		  alert('Unable to get location: ' + error.message);
		});
	};
});



// Generated by CoffeeScript 1.9.1 for rating
(function() {
  angular.module('ionic.rating', []).constant('ratingConfig', {
    max: 5,
    stateOn: null,
    stateOff: null
  }).controller('RatingController', function($scope, $attrs, ratingConfig) {
    var ngModelCtrl;
    ngModelCtrl = {
      $setViewValue: angular.noop
    };
    this.init = function(ngModelCtrl_) {
      var max, ratingStates;
      ngModelCtrl = ngModelCtrl_;
      ngModelCtrl.$render = this.render;
      this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn;
      this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff;
      max = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max;
      ratingStates = angular.isDefined($attrs.ratingStates) ? $scope.$parent.$eval($attrs.ratingStates) : new Array(max);
      return $scope.range = this.buildTemplateObjects(ratingStates);
    };
    this.buildTemplateObjects = function(states) {
      var i, j, len, ref;
      ref = states.length;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        states[i] = angular.extend({
          index: 1
        }, {
          stateOn: this.stateOn,
          stateOff: this.stateOff
        }, states[i]);
      }
      return states;
    };
    $scope.rate = function(value) {
      if (!$scope.readonly && value >= 0 && value <= $scope.range.length) {
        ngModelCtrl.$setViewValue(value);
        return ngModelCtrl.$render();
      }
    };
    $scope.reset = function() {
      $scope.value = ngModelCtrl.$viewValue;
      return $scope.onLeave();
    };
    $scope.enter = function(value) {
      if (!$scope.readonly) {
        $scope.value = value;
      }
      return $scope.onHover({
        value: value
      });
    };
    $scope.onKeydown = function(evt) {
      if (/(37|38|39|40)/.test(evt.which)) {
        evt.preventDefault();
        evt.stopPropagation();
        return $scope.rate($scope.value + (evt.which === 38 || evt.which === 39 ? {
          1: -1
        } : void 0));
      }
    };
    this.render = function() {
      return $scope.value = ngModelCtrl.$viewValue;
    };
    return this;
  }).directive('rating', function() {
    return {
      restrict: 'EA',
      require: ['rating', 'ngModel'],
      scope: {
        readonly: '=?',
        onHover: '&',
        onLeave: '&'
      },
      controller: 'RatingController',
      //template: '<ul class="rating" ng-mouseleave="reset()" ng-keydown="onKeydown($event)">' + '<li ng-repeat="r in range track by $index" ng-click="rate($index + 1)"><i class="icon" ng-class="$index < value && (r.stateOn || \'ion-ios-star\') || (r.stateOff || \'ion-ios-star-outline\')"></i></li>' + '</ul>',
	  template: '<ul class="rating">' + '<li ng-repeat="r in range track by $index"><i class="icon" ng-class="$index < value && (r.stateOn || \'ion-ios-star\') || (r.stateOff || \'ion-ios-star-outline\')"></i></li>' + '</ul>',
      replace: true,
      link: function(scope, element, attrs, ctrls) {
        var ngModelCtrl, ratingCtrl;
        ratingCtrl = ctrls[0];
        ngModelCtrl = ctrls[1];
        if (ngModelCtrl) {
          return ratingCtrl.init(ngModelCtrl);
        }
      }
    };
  });

}).call(this);