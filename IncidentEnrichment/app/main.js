﻿(function () {
    'use strict';

     var app = angular.module("main", []);

    app.constant('appSettings', {
        apiServiceBaseUri: 'http://localhost:52041/'
    });
}()); 