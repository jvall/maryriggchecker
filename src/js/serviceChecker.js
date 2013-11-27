var app = angular.module('serviceChecker', ['google-maps']);

app.controller('ServiceCtrl', function($scope) {

    $scope.hideSingleSection = false;
    $scope.hideMultipleSection = true;

    $scope.singleSearchText = "";
    $scope.multipleSearchText = "";
    $scope.delimeter = ";";

    $scope.markers = [];

    $scope.geocoder = new google.maps.Geocoder();

    $scope.singleSearch = function() {
        $scope.geocoder.geocode( { 'address': $scope.singleSearchText}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
            $scope.markers.push({latitude: results[0].geometry.location.ob,
                longitude: results[0].geometry.location.pb});
            $scope.$apply();
          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        });
    };

    $scope.multipleSearch = function() {


        /*var addrArr = $scope.multipleSearchText.split(delimeter);


        $scope.geocoder.geocode( { 'address': $scope.singleSearchText}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
            $scope.markers.push({latitude: results[0].geometry.location.ob,
                longitude: results[0].geometry.location.pb});
            $scope.$apply();
          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        });*/
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
        zoomProperty: 13, // the zoom level
        clickedLatitudeProperty: null,  
        clickedLongitudeProperty: null,
    });
});