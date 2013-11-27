/**!
 * The MIT License
 * 
 * Copyright (c) 2010-2012 Google, Inc. http://angularjs.org
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 * angular-google-maps
 * https://github.com/nlaplante/angular-google-maps
 * 
 * @author Nicolas Laplante https://plus.google.com/108189012221374960701
 */


(function () {
  
  "use strict";
  
  /*
   * Utility functions
   */
  
  /**
   * Check if 2 floating point numbers are equal
   * 
   * @see http://stackoverflow.com/a/588014
   */
  function floatEqual (f1, f2) {
    return (Math.abs(f1 - f2) < 0.000001);
  }
  
  /* 
   * Create the model in a self-contained class where map-specific logic is 
   * done. This model will be used in the directive.
   */
  
  var MapModel = (function () {
    
    var _defaults = { 
        zoom: 8,
        draggable: false,
        container: null
      };
    
    /**
     * 
     */
    function PrivateMapModel(opts) {
      
      var _instance = null,
        _markers = [],  // caches the instances of google.maps.Marker
        _handlers = [], // event handlers
        _windows = [],  // InfoWindow objects
        o = angular.extend({}, _defaults, opts),
        that = this,
        currentInfoWindow = null,
        _serviceArea = null;
              
      this.center = opts.center;
      this.zoom = o.zoom;
      this.draggable = o.draggable;
      this.dragging = false;
      this.selector = o.container;
      this.markers = [];
      this.options = o.options;
      
      this.draw = function () {
        
        if (that.center == null) {
          // TODO log error
          return;
        }
        
        if (_instance == null) {
          
          // Create a new map instance
          
          _instance = new google.maps.Map(that.selector, angular.extend(that.options, {
            center: that.center,
            zoom: that.zoom,
            draggable: that.draggable,
            mapTypeId : google.maps.MapTypeId.ROADMAP
          }));

             /*var polyOptions = {
              paths: [new google.maps.LatLng(39.736500,-86.187813),
              new google.maps.LatLng(39.736053,-86.191025),
              new google.maps.LatLng(39.735657,-86.192337),
              new google.maps.LatLng(39.735329,-86.193771),
              new google.maps.LatLng(39.735275,-86.195061),
              new google.maps.LatLng(39.735394,-86.196327),
              new google.maps.LatLng(39.735474,-86.197746),
              new google.maps.LatLng(39.735493,-86.198578),
              new google.maps.LatLng(39.735622,-86.199226),
              new google.maps.LatLng(39.735935,-86.200531),
              new google.maps.LatLng(39.736134,-86.201180),
              new google.maps.LatLng(39.736202,-86.201843),
              new google.maps.LatLng(39.736202,-86.203362),
              new google.maps.LatLng(39.736153,-86.204140),
              new google.maps.LatLng(39.736118,-86.204521),
              new google.maps.LatLng(39.736134,-86.205101),
              new google.maps.LatLng(39.736004,-86.207054),
              new google.maps.LatLng(39.735954,-86.207809),
              new google.maps.LatLng(39.735954,-86.208405),
              new google.maps.LatLng(39.735935,-86.209564),
              new google.maps.LatLng(39.735954,-86.211113),
              new google.maps.LatLng(39.735935,-86.211929),
              new google.maps.LatLng(39.735855,-86.212807),
              new google.maps.LatLng(39.735592,-86.213791),
              new google.maps.LatLng(39.735344,-86.214714),
              new google.maps.LatLng(39.735229,-86.215210),
              new google.maps.LatLng(39.734932,-86.216217),
              new google.maps.LatLng(39.734650,-86.217209),
              new google.maps.LatLng(39.734352,-86.218597),
              new google.maps.LatLng(39.734074,-86.221367),
              new google.maps.LatLng(39.733891,-86.225121),
              new google.maps.LatLng(39.734516,-86.225105),
              new google.maps.LatLng(39.743050,-86.225121),
              new google.maps.LatLng(39.747356,-86.225121),
              new google.maps.LatLng(39.751480,-86.225082),
              new google.maps.LatLng(39.751610,-86.225067),
              new google.maps.LatLng(39.751659,-86.225067),
              new google.maps.LatLng(39.751743,-86.225067),
              new google.maps.LatLng(39.751766,-86.225067),
              new google.maps.LatLng(39.751827,-86.225060),
              new google.maps.LatLng(39.751884,-86.225044),
              new google.maps.LatLng(39.751900,-86.225060),
              new google.maps.LatLng(39.752106,-86.225105),
              new google.maps.LatLng(39.752277,-86.225105),
              new google.maps.LatLng(39.752537,-86.225090),
              new google.maps.LatLng(39.752666,-86.225105),
              new google.maps.LatLng(39.752831,-86.225113),
              new google.maps.LatLng(39.752972,-86.225113),
              new google.maps.LatLng(39.753063,-86.225113),
              new google.maps.LatLng(39.753120,-86.225105),
              new google.maps.LatLng(39.753197,-86.225082),
              new google.maps.LatLng(39.753120,-86.225090),
              new google.maps.LatLng(39.753078,-86.225113),
              new google.maps.LatLng(39.753036,-86.225121),
              new google.maps.LatLng(39.753155,-86.225113),
              new google.maps.LatLng(39.753212,-86.225105),
              new google.maps.LatLng(39.753254,-86.225105),
              new google.maps.LatLng(39.753262,-86.225082),
              new google.maps.LatLng(39.753277,-86.225090),
              new google.maps.LatLng(39.753345,-86.225105),
              new google.maps.LatLng(39.753376,-86.225090),
              new google.maps.LatLng(39.753418,-86.225105),
              new google.maps.LatLng(39.753296,-86.225082),
              new google.maps.LatLng(39.753345,-86.225090),
              new google.maps.LatLng(39.753391,-86.225067),
              new google.maps.LatLng(39.753418,-86.225105),
              new google.maps.LatLng(39.753452,-86.225090),
              new google.maps.LatLng(39.753502,-86.225090),
              new google.maps.LatLng(39.753887,-86.225105),
              new google.maps.LatLng(39.753574,-86.225105),
              new google.maps.LatLng(39.753723,-86.225105),
              new google.maps.LatLng(39.753880,-86.225105),
              new google.maps.LatLng(39.753986,-86.225090),
              new google.maps.LatLng(39.754120,-86.225105),
              new google.maps.LatLng(39.754150,-86.225113),
              new google.maps.LatLng(39.754177,-86.225113),
              new google.maps.LatLng(39.754200,-86.225113),
              new google.maps.LatLng(39.754219,-86.225113),
              new google.maps.LatLng(39.754211,-86.225113),
              new google.maps.LatLng(39.754227,-86.225113),
              new google.maps.LatLng(39.754250,-86.225113),
              new google.maps.LatLng(39.754269,-86.225113),
              new google.maps.LatLng(39.754269,-86.225105),
              new google.maps.LatLng(39.754276,-86.225113),
              new google.maps.LatLng(39.754284,-86.225090),
              new google.maps.LatLng(39.754349,-86.225090),
              new google.maps.LatLng(39.754398,-86.225090),
              new google.maps.LatLng(39.754433,-86.225082),
              new google.maps.LatLng(39.754532,-86.225082),
              new google.maps.LatLng(39.754581,-86.225082),
              new google.maps.LatLng(39.754616,-86.225082),
              new google.maps.LatLng(39.754753,-86.225082),
              new google.maps.LatLng(39.754902,-86.225090),
              new google.maps.LatLng(39.755066,-86.225090),
              new google.maps.LatLng(39.755192,-86.225105),
              new google.maps.LatLng(39.755421,-86.225105),
              new google.maps.LatLng(39.755653,-86.225113),
              new google.maps.LatLng(39.756100,-86.225082),
              new google.maps.LatLng(39.756329,-86.225082),
              new google.maps.LatLng(39.756569,-86.225090),
              new google.maps.LatLng(39.757484,-86.225037),
              new google.maps.LatLng(39.757946,-86.225014),
              new google.maps.LatLng(39.758408,-86.225082),
              new google.maps.LatLng(39.759365,-86.225037),
              new google.maps.LatLng(39.759892,-86.225037),
              new google.maps.LatLng(39.760204,-86.224998),
              new google.maps.LatLng(39.760502,-86.224953),
              new google.maps.LatLng(39.761345,-86.222160),
              new google.maps.LatLng(39.761806,-86.220810),
              new google.maps.LatLng(39.762218,-86.220169),
              new google.maps.LatLng(39.762417,-86.219780),
              new google.maps.LatLng(39.762417,-86.219460),
              new google.maps.LatLng(39.762432,-86.219353),
              new google.maps.LatLng(39.762383,-86.219269),
              new google.maps.LatLng(39.762432,-86.219200),
              new google.maps.LatLng(39.762417,-86.219139),
              new google.maps.LatLng(39.762417,-86.219070),
              new google.maps.LatLng(39.762432,-86.218834),
              new google.maps.LatLng(39.762447,-86.218475),
              new google.maps.LatLng(39.762516,-86.217957),
              new google.maps.LatLng(39.762516,-86.217567),
              new google.maps.LatLng(39.762547,-86.216667),
              new google.maps.LatLng(39.762596,-86.215637),
              new google.maps.LatLng(39.762745,-86.213211),
              new google.maps.LatLng(39.762844,-86.211624),
              new google.maps.LatLng(39.762913,-86.210617),
              new google.maps.LatLng(39.762943,-86.210190),
              new google.maps.LatLng(39.763042,-86.208969),
              new google.maps.LatLng(39.763191,-86.205467),
              new google.maps.LatLng(39.763256,-86.203728),
              new google.maps.LatLng(39.763325,-86.202873),
              new google.maps.LatLng(39.763374,-86.201950),
              new google.maps.LatLng(39.763916,-86.191116),
              new google.maps.LatLng(39.764164,-86.186905),
              new google.maps.LatLng(39.764297,-86.183647),
              new google.maps.LatLng(39.764412,-86.181969),
              new google.maps.LatLng(39.764446,-86.181175),
              new google.maps.LatLng(39.764477,-86.180382),
              new google.maps.LatLng(39.764397,-86.178665),
              new google.maps.LatLng(39.764179,-86.176949),
              new google.maps.LatLng(39.764000,-86.175407),
              new google.maps.LatLng(39.763885,-86.174507),
              new google.maps.LatLng(39.763851,-86.174095),
              new google.maps.LatLng(39.763836,-86.173904),
              new google.maps.LatLng(39.763687,-86.173775),
              new google.maps.LatLng(39.763519,-86.173950),
              new google.maps.LatLng(39.762959,-86.174332),
              new google.maps.LatLng(39.762547,-86.174545),
              new google.maps.LatLng(39.762104,-86.174568),
              new google.maps.LatLng(39.761841,-86.174568),
              new google.maps.LatLng(39.761593,-86.174545),
              new google.maps.LatLng(39.761330,-86.174637),
              new google.maps.LatLng(39.761032,-86.174675),
              new google.maps.LatLng(39.760635,-86.174652),
              new google.maps.LatLng(39.760204,-86.174675),
              new google.maps.LatLng(39.759792,-86.174637),
              new google.maps.LatLng(39.759430,-86.174652),
              new google.maps.LatLng(39.759068,-86.174614),
              new google.maps.LatLng(39.758770,-86.174438),
              new google.maps.LatLng(39.758026,-86.174438),
              new google.maps.LatLng(39.757584,-86.174416),
              new google.maps.LatLng(39.757271,-86.174400),
              new google.maps.LatLng(39.756874,-86.174294),
              new google.maps.LatLng(39.756577,-86.174271),
              new google.maps.LatLng(39.755901,-86.174072),
              new google.maps.LatLng(39.755505,-86.174011),
              new google.maps.LatLng(39.754959,-86.174141),
              new google.maps.LatLng(39.754696,-86.174141),
              new google.maps.LatLng(39.754517,-86.174141),
              new google.maps.LatLng(39.754349,-86.174202),
              new google.maps.LatLng(39.754101,-86.174294),
              new google.maps.LatLng(39.753922,-86.174416),
              new google.maps.LatLng(39.753723,-86.174568),
              new google.maps.LatLng(39.753277,-86.174591),
              new google.maps.LatLng(39.752899,-86.174744),
              new google.maps.LatLng(39.752468,-86.174805),
              new google.maps.LatLng(39.751759,-86.174980),
              new google.maps.LatLng(39.750999,-86.174873),
              new google.maps.LatLng(39.749878,-86.174416),
              new google.maps.LatLng(39.749237,-86.174187),
              new google.maps.LatLng(39.748642,-86.173950),
              new google.maps.LatLng(39.747322,-86.173347),
              new google.maps.LatLng(39.745689,-86.172165),
              new google.maps.LatLng(39.744846,-86.171585),
              new google.maps.LatLng(39.744038,-86.170944),
              new google.maps.LatLng(39.743362,-86.170555),
              new google.maps.LatLng(39.743065,-86.170319),
              new google.maps.LatLng(39.742802,-86.170189),
              new google.maps.LatLng(39.742519,-86.170059),
              new google.maps.LatLng(39.741730,-86.169891),
              new google.maps.LatLng(39.740623,-86.170082),
              new google.maps.LatLng(39.740112,-86.170174),
              new google.maps.LatLng(39.739567,-86.170319),
              new google.maps.LatLng(39.739334,-86.170258),
              new google.maps.LatLng(39.739239,-86.170021),
              new google.maps.LatLng(39.738674,-86.170189),
              new google.maps.LatLng(39.738510,-86.170189),
              new google.maps.LatLng(39.738361,-86.170387),
              new google.maps.LatLng(39.738281,-86.170578),
              new google.maps.LatLng(39.737949,-86.170639),
              new google.maps.LatLng(39.737770,-86.170731),
              new google.maps.LatLng(39.737572,-86.170792),
              new google.maps.LatLng(39.737408,-86.170860),
              new google.maps.LatLng(39.737225,-86.170944),
              new google.maps.LatLng(39.737225,-86.171738),
              new google.maps.LatLng(39.737209,-86.172424),
              new google.maps.LatLng(39.737225,-86.173325),
              new google.maps.LatLng(39.737091,-86.174355),
              new google.maps.LatLng(39.736992,-86.175430),
              new google.maps.LatLng(39.736961,-86.176155),
              new google.maps.LatLng(39.736927,-86.177956),
              new google.maps.LatLng(39.736893,-86.180344),
              new google.maps.LatLng(39.736813,-86.182724),
              new google.maps.LatLng(39.736813,-86.183861),
              new google.maps.LatLng(39.736763,-86.184418),
              new google.maps.LatLng(39.736794,-86.185059),
              new google.maps.LatLng(39.736500,-86.187813)
            ],
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35
          };

          _serviceArea = new google.maps.Polygon(polyOptions);
          _serviceArea.setMap(_instance);*/
          
          google.maps.event.addListener(_instance, "dragstart",
              
              function () {
                that.dragging = true;
              }
          );
          
          google.maps.event.addListener(_instance, "idle",
              
              function () {
                that.dragging = false;
              }
          );
          
          google.maps.event.addListener(_instance, "drag",
              
              function () {
                that.dragging = true;   
              }
          );  
          
          google.maps.event.addListener(_instance, "zoom_changed",
              
              function () {
                that.zoom = _instance.getZoom();
                that.center = _instance.getCenter();
              }
          );
          
          google.maps.event.addListener(_instance, "center_changed",
              
              function () {
                that.center = _instance.getCenter();
              }
          );
          
          // Attach additional event listeners if needed
          if (_handlers.length) {
            
            angular.forEach(_handlers, function (h, i) {
              
              google.maps.event.addListener(_instance, 
                  h.on, h.handler);
            });
          }
        }
        else {
          
          // Refresh the existing instance
          google.maps.event.trigger(_instance, "resize");
          
          var instanceCenter = _instance.getCenter();
          
          if (!floatEqual(instanceCenter.lat(), that.center.lat())
            || !floatEqual(instanceCenter.lng(), that.center.lng())) {
              _instance.setCenter(that.center);
          }
        
          if (_instance.getZoom() != that.zoom) {
            _instance.setZoom(that.zoom);
          }          
        }
      };
      
      this.fit = function () {
        if (_instance && _markers.length) {
          
          var bounds = new google.maps.LatLngBounds();
          
          angular.forEach(_markers, function (m, i) {
            bounds.extend(m.getPosition());
          });
          
          _instance.fitBounds(bounds);
        }
      };
      
      this.on = function(event, handler) {
        _handlers.push({
          "on": event,
          "handler": handler
        });
      };
      
      this.addMarker = function (lat, lng, icon, infoWindowContent, label, url,
          thumbnail) {
        
        if (that.findMarker(lat, lng) != null) {
          return;
        }
        
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lng),
          map: _instance,
          icon: icon
        });
        
        if (label) {
          
        }
        
        if (url) {
          
        }

        if (infoWindowContent != null) {
          var infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent
          });

          google.maps.event.addListener(marker, 'click', function() {
            if (currentInfoWindow != null) {
              currentInfoWindow.close();
            }
            infoWindow.open(_instance, marker);
            currentInfoWindow = infoWindow;
          });
        }

        //serviceArea.setMap(_instance);
        
        // Cache marker 
        _markers.unshift(marker);
        
        // Cache instance of our marker for scope purposes
        that.markers.unshift({
          "lat": lat,
          "lng": lng,
          "draggable": false,
          "icon": icon,
          "infoWindowContent": infoWindowContent,
          "label": label,
          "url": url,
          "thumbnail": thumbnail
        });
        
        // Return marker instance
        return marker;
      };      
      
      this.findMarker = function (lat, lng) {
        for (var i = 0; i < _markers.length; i++) {
          var pos = _markers[i].getPosition();
          
          if (floatEqual(pos.lat(), lat) && floatEqual(pos.lng(), lng)) {
            return _markers[i];
          }
        }
        
        return null;
      };  
      
      this.findMarkerIndex = function (lat, lng) {
        for (var i = 0; i < _markers.length; i++) {
          var pos = _markers[i].getPosition();
          
          if (floatEqual(pos.lat(), lat) && floatEqual(pos.lng(), lng)) {
            return i;
          }
        }
        
        return -1;
      };
      
      this.addInfoWindow = function (lat, lng, html) {
        var win = new google.maps.InfoWindow({
          content: html,
          position: new google.maps.LatLng(lat, lng)
        });
        
        _windows.push(win);
        
        return win;
      };
      
      this.hasMarker = function (lat, lng) {
        return that.findMarker(lat, lng) !== null;
      };  
      
      this.getMarkerInstances = function () {
        return _markers;
      };
      
      this.removeMarkers = function (markerInstances) {
        
        var s = this;
        
        angular.forEach(markerInstances, function (v, i) {
          var pos = v.getPosition(),
            lat = pos.lat(),
            lng = pos.lng(),
            index = s.findMarkerIndex(lat, lng);
          
          // Remove from local arrays
          _markers.splice(index, 1);
          s.markers.splice(index, 1);
          
          // Remove from map
          v.setMap(null);
        });
      };
    }
    
    // Done
    return PrivateMapModel;
  }());
  
  // End model
  
  // Start Angular directive
  
  var googleMapsModule = angular.module("google-maps", []);

  /**
   * Map directive
   */
  googleMapsModule.directive("googleMap", ["$log", "$timeout", "$filter", function ($log, $timeout, 
      $filter) {

    var controller = function ($scope, $element) {
      
      var _m = $scope.map;
      
      self.addInfoWindow = function (lat, lng, content) {
        _m.addInfoWindow(lat, lng, content);
      };
    };

    controller.$inject = ['$scope', '$element'];
    
    return {
      restrict: "ECA",
      priority: 100,
      transclude: true,
      template: "<div class='angular-google-map' ng-transclude></div>",
      replace: false,
      scope: {
        center: "=center", // required
        markers: "=markers", // optional
        latitude: "=latitude", // required
        longitude: "=longitude", // required
        zoom: "=zoom", // required
        refresh: "&refresh", // optional
        windows: "=windows", // optional
        events: "=events"
      },
      controller: controller,      
      link: function (scope, element, attrs, ctrl) {
        
        // Center property must be specified and provide lat & 
        // lng properties
        if (!angular.isDefined(scope.center) || 
            (!angular.isDefined(scope.center.latitude) || 
                !angular.isDefined(scope.center.longitude))) {
        	
          $log.error("angular-google-maps: could not find a valid center property");          
          return;
        }
        
        if (!angular.isDefined(scope.zoom)) {
        	$log.error("angular-google-maps: map zoom property not set");
        	return;
        }
        
        angular.element(element).addClass("angular-google-map");

        // Parse options
        var opts = {options: {}};
        if (attrs.options) {
          opts.options = angular.fromJson(attrs.options);
        }
        
        // Create our model
        var _m = new MapModel(angular.extend(opts, {
          container: element[0],            
          center: new google.maps.LatLng(scope.center.latitude, scope.center.longitude),              
          draggable: attrs.draggable == "true",
          zoom: scope.zoom
        }));       
      
        _m.on("drag", function () {
          
          var c = _m.center;
        
          $timeout(function () {
            
            scope.$apply(function (s) {
              scope.center.latitude = c.lat();
              scope.center.longitude = c.lng();
            });
          });
        });
      
        _m.on("zoom_changed", function () {
          
          if (scope.zoom != _m.zoom) {
            
            $timeout(function () {
              
              scope.$apply(function (s) {
                scope.zoom = _m.zoom;
              });
            });
          }
        });
      
        _m.on("center_changed", function () {
          var c = _m.center;
        
          $timeout(function () {
            
            scope.$apply(function (s) {
              
              if (!_m.dragging) {
                scope.center.latitude = c.lat();
                scope.center.longitude = c.lng();
              }
            });
          });
        });
        
        if (angular.isDefined(scope.events)) {
          for (var eventName in scope.events) {
            if (scope.events.hasOwnProperty(eventName) && angular.isFunction(scope.events[eventName])) {
              _m.on(eventName, function () {
                scope.events[eventName].apply(scope, [_m, eventName, arguments]);
              });
            }
          }
        }
        
        if (attrs.markClick == "true") {
          (function () {
            var cm = null;
            
            _m.on("click", function (e) {                         
              if (cm == null) {
                
                cm = {
                  latitude: e.latLng.lat(),
                  longitude: e.latLng.lng() 
                };
                
                scope.markers.push(cm);
              }
              else {
                cm.latitude = e.latLng.lat();
                cm.longitude = e.latLng.lng();
              }
              
              
              $timeout(function () {
                scope.latitude = cm.latitude;
                scope.longitude = cm.longitude;
                scope.$apply();
              });
            });
          }());
        }
        
        // Put the map into the scope
        scope.map = _m;
        
        // Check if we need to refresh the map
        if (angular.isUndefined(scope.refresh())) {
          // No refresh property given; draw the map immediately
          _m.draw();
        }
        else {
          scope.$watch("refresh()", function (newValue, oldValue) {
            if (newValue && !oldValue) {
              _m.draw();
            }
          }); 
        }

        // Markers
        scope.$watch("markers", function (newValue, oldValue) {
          
          console.log(scope.toPrint);

          $timeout(function () {
            
            angular.forEach(newValue, function (v, i) {
              if (!_m.hasMarker(v.latitude, v.longitude)) {
                _m.addMarker(v.latitude, v.longitude, v.icon, v.infoWindow);
              }
            });
            
            // Clear orphaned markers
            var orphaned = [];
            
            angular.forEach(_m.getMarkerInstances(), function (v, i) {
              // Check our scope if a marker with equal latitude and longitude. 
              // If not found, then that marker has been removed form the scope.
              
              var pos = v.getPosition(),
                lat = pos.lat(),
                lng = pos.lng(),
                found = false;
              
              // Test against each marker in the scope
              for (var si = 0; si < scope.markers.length; si++) {
                
                var sm = scope.markers[si];
                
                if (floatEqual(sm.latitude, lat) && floatEqual(sm.longitude, lng)) {
                  // Map marker is present in scope too, don't remove
                  found = true;
                }
              }
              
              // Marker in map has not been found in scope. Remove.
              if (!found) {
                orphaned.push(v);
              }
            });

            orphaned.length && _m.removeMarkers(orphaned);           
            
            // Fit map when there are more than one marker. 
            // This will change the map center coordinates
            if (attrs.fit == "true" && newValue && newValue.length > 1) {
              _m.fit();
            }
          });
          
        }, true);
        
        
        // Update map when center coordinates change
        scope.$watch("center", function (newValue, oldValue) {
          if (newValue === oldValue) {
            return;
          }
          
          if (!_m.dragging) {
            _m.center = new google.maps.LatLng(newValue.latitude, 
                newValue.longitude);          
            _m.draw();
          }
        }, true);
        
        scope.$watch("zoom", function (newValue, oldValue) {
          if (newValue === oldValue) {
            return;
          }
          
          _m.zoom = newValue;
          _m.draw();
        });
      }
    };
  }]);  
}());
