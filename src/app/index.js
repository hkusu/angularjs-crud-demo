'use strict';

angular.module('adminDemo', ['ngTouch', 'ngSanitize', 'ui.router', 'ngMockE2E'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('item', {
        url: '/item',
        templateUrl: 'app/item/item.html',
        controller: 'ItemCtrl'
      });

    $urlRouterProvider.otherwise('/item');
  })
  .run(function ($httpBackend) {
    $httpBackend.whenGET(/^app\//).passThrough();
    $httpBackend.whenGET(/^assets\//).passThrough();
    $httpBackend.whenGET(/^components\//).passThrough();

    var dummy_items = [
      {
        "id": "1",
        "name": "石鹸",
        "price": 230,
        "memo": "石鹸のメモ"
      },
      {
        "id": "2",
        "name": "ボディソープ",
        "price": 550,
        "memo": "ボディソープのメモ"
      },
      {
        "id": "3",
        "name": "ハンドソープ",
        "price": 340,
        "memo": "ハンドソープのメモ"
      }
    ];

    $httpBackend.whenGET(/^\/api\/items/).respond(dummy_items);
    $httpBackend.whenPOST(/^\/api\/items/).respond(function(method, url, data) {
      var res = angular.fromJson(data);
      var obj = {
        "id": "dummy",
        "name": res.name,
        "price": res.price,
        "memo": res.memo
      };
      return [200, obj, {}];
    });
    $httpBackend.whenPUT(/^\/api\/items/).respond({});
    $httpBackend.whenDELETE(/^\/api\/items/).respond({});
  })
;
