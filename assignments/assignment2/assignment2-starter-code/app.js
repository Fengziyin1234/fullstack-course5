(function() {
'use strict'
angular.module("ShoppingListCheckOff", []);

angular.module("ShoppingListCheckOff")
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

function ShoppingListCheckOffService() {
    var service = this;
    service.toBuyItems = [{ name: "cookies", quantity: 10 },
        { name: "milk", quantity: 5 },
        { name: "apples", quantity: 3 },
        { name: "chips", quantity: 111 },
        { name: "choolates", quantity: 3 },
        { name: "popcorn", quantity: 2 },
        { name: "soda", quantity: 9 },
        { name: "cakes", quantity: 6 },
        { name: "muffins", quantity: 7 },
        { name: "sandwich", quantity: 22 }
    ];
    service.boughtItems = [];

    service.buy = function(index) {
        console.log(service.toBuyItems[index]);
        service.boughtItems.push(service.toBuyItems[index]);
        console.log(service.boughtItems);
        service.toBuyItems.splice(index, 1);
        console.log(service.toBuyItems);
    }



    service.getToBuyItems = function() {
        return service.toBuyItems;
        // $scope.boughtItems.push()
    }

    service.getBroughtItems = function() {
        return service.boughtItems;
        // $scope.boughtItems.push()
    }

    service.checkToBuyItems = function() {
        return (service.toBuyItems.length == 0);
    }

    service.checkBoughtItems = function() {
        return (service.boughtItems.length == 0);
    }

}

ToBuyController.$inject = ["$scope", "ShoppingListCheckOffService"];

function ToBuyController($scope, ShoppingListCheckOffService) {
    $scope.items = ShoppingListCheckOffService.getToBuyItems();
    $scope.buy = function(index) {
        ShoppingListCheckOffService.buy(index);
    }
    $scope.empty = function() {
        return ShoppingListCheckOffService.checkToBuyItems();
    }
}


AlreadyBoughtController.$inject = ["$scope", "ShoppingListCheckOffService"]

function AlreadyBoughtController($scope, ShoppingListCheckOffService) {
    $scope.items = ShoppingListCheckOffService.getBroughtItems();
    $scope.empty = function() {
        return ShoppingListCheckOffService.checkBoughtItems();
    }
}

})();
