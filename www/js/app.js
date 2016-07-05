// JavaScript Document
//var globalip = "www.truhome.co/phonegapservices";
var globalip = "45.79.145.23/truhome.co/public_html/phonegapservices";
var token = "";
angular.module('ionicApp', ['ionic','ionic.rating','ngCordova','ngIOS9UIWebViewPatch','starter.controllers'])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('eventmenu', {
      url: "/event",
      abstract: true,
      templateUrl: "templates/event-menu.html"
    })
    .state('eventmenu.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html"
        }
      }
    })
    .state('eventmenu.checkin', {
      url: "/check-in",
      views: {
        'menuContent' :{
          templateUrl: "templates/check-in.html",
          controller: "CheckinCtrl"
        }
      }
    })
	.state('eventmenu.driver', {
      url: "/driver",
      views: {
        'menuContent' :{
          templateUrl: "templates/driver.html"
        }
      }
    })
	.state('eventmenu.schedule', {
      url: "/schedule",
      views: {
        'menuContent' :{
          templateUrl: "templates/schedule.html",
		  controller: "ScheduleCtrl"
        }
      }
    })
	.state('eventmenu.schedulelist', {
		url: "/schedulelist/:id?name",
		views: {
			'menuContent' :{
			  templateUrl: "templates/schedulelist.html",
			  controller: "scheduleCtrl"
		}
		}
    })
	
  $urlRouterProvider.otherwise("/event/check-in");
})

.directive('map', function() {
	return {
		restrict: 'E',
		scope: {
		  onCreate: '&'
		},
		link: function ($scope, $element, $attr) {
		  function initialize() {
			var myLatLng = {lat: 27.9769145, lng: -82.5590481};
			var mapOptions = {
			  center: new google.maps.LatLng(27.9769145, -82.5590481),
			  zoom: 16,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map($element[0], mapOptions);
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				label: "A",
				content:"Hello World!"
			});
			var infowindow = new google.maps.InfoWindow({
			  content:"5424 Ginger Cove Dr"
			});
			infowindow.open(map,marker);
			
			$scope.onCreate({map: map});
	
			// Stop the side bar from dragging when mousedown/tapdown on the map
			google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
			  e.preventDefault();
			  return false;
			});
		  }
	
		  if (document.readyState === "complete") {
			initialize();
		  } else {
			google.maps.event.addDomListener(window, 'load', initialize);
		  }
		}
  	}
})

