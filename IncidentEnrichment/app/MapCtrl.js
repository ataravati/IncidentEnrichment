﻿(function () {
    'use strict';

    var module = angular.module("main");
     module.controller('MapCtrl',
         ["$scope", "incidentService", "weatherService",
             function ($scope, incidentService, weatherService) {
                 var marker;   
                 var center = { lat: 37.5407, lng: -77.4360 };
                 $scope.error = '';
                 $scope.IncidentNumber = '';
                 $scope.incident = {};
                 $scope.weather = {};

                 function initialize() {
                     $scope.map = new google.maps.Map(document.getElementById('map'), {
                         zoom: 10,
                         center: center
                     });
                 }

                 google.maps.event.addDomListener(window, 'load', initialize);

                 $scope.findIncident = function () {
                     $scope.error = '';
                     $scope.incident = {};
                     $scope.weather = {};
                     if (marker) {
                         marker.setMap(null);
                     }
                     $scope.map.setZoom(10);
                     $scope.map.panTo(center);

                     incidentService.getIncident($scope.incidentNumber).then(function (response) {
                         $scope.incident = response.data;
                         showIncidentOnMap();
                         getWeatherInfo();
                     }, function (response) {
                         if (response.status === 404) {
                             $scope.error = "The incedent was not found.";
                         }
                         else {
                             $scope.error = "Something went wrong. Could not fetch the records.";
                         }
                     });
                 };

                 var showIncidentOnMap = function () {
                     var address = $scope.incident.address;
                     var position = { lat: address.latitude, lng: address.longitude };
                     marker = new google.maps.Marker({
                         position: position,
                         title: "Incident: " + $scope.incident.description.incident_number
                     });

                     marker.setMap($scope.map);
                     $scope.map.setZoom(17);
                     $scope.map.panTo(position);
                 };

                 var getWeatherInfo = function () {
                     var latitude = $scope.incident.address.latitude;
                     var longitude = $scope.incident.address.longitude;
                     var start_date = $scope.incident.description.event_opened;
                     var end_date = $scope.incident.description.event_closed;

                     weatherService.getWeatherInfo(latitude, longitude, start_date, end_date).then(function (response) {
                         if (response.data.error) {
                             $scope.weather = {};
                             $scope.error = "Weather info is not available.";
                         }
                         else {
                             $scope.weather = response.data.data[0];
                         }
                     }, function (response) {
                         $scope.weather = {};
                         $scope.error = "Weather info is not available.";
                     });
                 };
             }
        ]);
}());
