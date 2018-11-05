﻿(function () {
    'use strict';

    var module = angular.module("main");
    module.controller('MapCtrl',
        ["$scope", "$rootScope", "$compile",
            function ($scope, $rootScope, $compile) {
                function initialize() {
                    $scope.map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 10,
                        center: { lat: 37.5407, lng: -77.4360 } // Richmond, VA
                    });
                }

                google.maps.event.addDomListener(window, 'load', initialize);
            }
        ]);
}());
