(function(ol) {
  'use strict';

  angular.module('light_visu')
  .controller('MainController', ['$rootScope', '$scope', MainController]);

  function MainController($rootScope, $scope) {

    var vm = this;

    $scope.data = {
      wmsServerUrl: '//localhost/cgi-bin/mapserv',
      MAP : '/home/remi/Documents/wms/map.map',
      REQUEST : 'GetMap',
      LAYERS: 'rgb',
      CRS : 'EPSG:3857',
      SERVICE : 'WMS',
      VERSION : '1.3.0',
      TRANSPARENT : 'true',
      STYLES : '',
      FORMAT : 'image/png'
    };

    $scope.submit = function(){
      $scope.map.removeLayer($scope.wmsLayer);
      $scope.addLayer();
    };

    $scope.addLayer = function(){
      $scope.wmsSource = new ol.source.TileWMS({
        url: $scope.data.wmsServerUrl,
        params: {
          'MAP' : $scope.data.MAP,
          'REQUEST' : $scope.data.REQUEST,
          'LAYERS': $scope.data.LAYERS,
          'CRS' : $scope.data.CRS,
          'SERVICE' : $scope.data.SERVICE,
          'VERSION' : $scope.data.VERSION,
          'TRANSPARENT' : $scope.data.TRANSPARENT,
          'STYLES' : $scope.data.STYLES,
          'FORMAT' : $scope.data.FORMAT
        },
        serverType: 'mapserver',
        crossOrigin: ''
      });

      $scope.wmsLayer = new ol.layer.Tile({
        source: $scope.wmsSource
      });

      $scope.map.addLayer($scope.wmsLayer);
    };

    $scope.map = new ol.Map({
      layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
      ],
      controls: ol.control.defaults({
        attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
          collapsible: false
        })
      }),
      target: 'map',
      view: new ol.View({
        center: [0, 0],
        zoom: 2
      })
    });

    $scope.addLayer();

  }
})(ol);
