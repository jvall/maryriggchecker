var app = angular.module('serviceChecker', ['google-maps']);

app.controller('ServiceCtrl', function($scope) {

    $scope.hideSingleSection = false;
    $scope.hideMultipleSection = true;

    $scope.singleSearchText = "";
    $scope.multipleSearchText = "";

    $scope.singleSearch = function() {
        console.log("Address: " + $scope.singleSearchText);
    };

    $scope.multipleSearch = function() {
        console.log("Address: " + $scope.multipleSearchText);
    };

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
        centerProperty: {
            latitude: 39.751071, // initial map center latitude
            longitude: -86.195116, // initial map center longitude
        },
        markersProperty: [], // an array of markers,
        zoomProperty: 13, // the zoom level
        clickedLatitudeProperty: null,  
        clickedLongitudeProperty: null
    });
});