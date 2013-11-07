var app = angular.module('serviceChecker', ['google-maps']);

app.controller('ServiceCtrl', function($scope) {

    $scope.hideSingleSection = false;
    $scope.hideMultipleSection = true;

    $scope.showSingle = function() {
        $scope.hideSingleSection = false;
        $scope.hideMultipleSection = true;
    };

    $scope.showMultiple = function() {
        $scope.hideSingleSection = true;
        $scope.hideMultipleSection = false;
    };

    $scope.navClass = function(name) {
        if (name == 'single')
            return ($scope.hideMultipleSection) ? "active" : "";
        else if (name == 'multiple') 
            return ($scope.hideSingleSection) ? "active" : "";
        else
            return "";
    };

    angular.extend($scope, {
        center: {
            latitude: 0, // initial map center latitude
            longitude: 0, // initial map center longitude
        },
        markers: [], // an array of markers,
        zoom: 8, // the zoom level
        clickedLatitudeProperty: null,  
        clickedLongitudeProperty: null,
    });
});