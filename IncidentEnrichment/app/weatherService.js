﻿(function () {
    'use strict';

    var module = angular.module("main");
    module.factory("weatherService", ["$http", "appSettings", function ($http, appSettings) {
        var baseUri = appSettings.apiServiceBaseUri;

        var getWeatherInfo = function (latitude, longitude, start_date, end_date) {
            var startDate = new Date(start_date);
            var endDate = new Date(end_date);

            var params = "latitude=" + latitude;
            params += "&longitude=" + longitude;
            params += "&startDate=" + startDate.toISOString();
            params += "&endDate=" + endDate.toISOString();

            return $http.get(baseUri + "api/Weather?" + params);
        };

        return {
            getWeatherInfo: getWeatherInfo
        };
    }]);
}());
