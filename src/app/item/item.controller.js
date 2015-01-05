'use strict';

angular.module('adminDemo')
  .controller('ItemCtrl', function ($scope, $http) {

    // 初期表示でアイテム一覧の取得
    // （API は GET /api/items で提供されるものとする）
    $http.get('/api/items').success(function(data) {
      $scope.items = data;
    });

    // アイテムの追加
    // （API は POST /api/items で提供されるものとする）
    $scope.add = function() {
      $http.post('/api/items', {
        name: $scope.newName,
        price: $scope.newPrice,
        memo: $scope.newMemo
      }).success(function(data) {
        // 画面にも反映する(配列へ追加)。サーバから払い出されたidが欲しいのでレスポンス結果から取得
        $scope.items.push(data);
      });
      // 入力欄をクリア
      $scope.newName = '';
      $scope.newPrice = '';
      $scope.newMemo = '';
    };

    // アイテムの更新
    // （API は PUT /api/items/:id で提供されるものとする）
    $scope.update = function(index) {
      $http.put('/api/items/' + $scope.items[index].id, {
        name: $scope.items[index].name,
        price: $scope.items[index].price,
        memo: $scope.items[index].memo
      });
    };

    // アイテムの削除
    //（API は DELETE /api/items/:id で提供されるものとする）
    $scope["delete"] = function(index) {
      $http["delete"]('/api/items/' + $scope.items[index].id);
      // 画面にも反映する(配列から削除)
      $scope.items.splice(index, 1);
    };
  });
