﻿(function () {
    'use strict';

    var module = angular.module("main");
    module.factory("incidentService", ["$http", "appSettings", function ($http, appSettings) {
        var baseUri = appSettings.apiServiceBaseUri;

        var getIncident = function (incidentNumber) {
            return $http.get(baseUri + "api/Incidents/" + incidentNumber);
        };

        return {
            getIncident: getIncident
        };
    }]);
}());
