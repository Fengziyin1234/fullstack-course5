(function() {
    'use strict'


    angular.module("NarrowItDownApp", []);

    angular.module("NarrowItDownApp")
        .controller("NarrowItDownController", NarrowItDownController)
        .controller("foundItemsDirectiveController",foundItemsDirectiveController)
        .service("MenuSearchService", MenuSearchService)
        .directive("foundItems", foundItemsDirective)
        .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");


    function foundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '=myItems',
                badRemove: '=',
                onRemove: '&'
            },
            controller: foundItemsDirectiveController,
    		controllerAs: 'list',
    		bindToController: true
          
        };

        return ddo;

    }

    function foundItemsDirectiveController () {
    	var list = this;

    }


    NarrowItDownController.$inject = ["MenuSearchService"];

    function NarrowItDownController(MenuSearchService) {
        var items = this;
        items.searchTerm = '';
        items.found = [];
        items.click = function() {
            MenuSearchService
                .getMatchedMenuItems(items.searchTerm)
                .then(function(response) {
                    items.found = response;
                    console.log(items.found);
                });
        };

        items.reomveItem = function(itemIndex) {
        	this.lastRemoved = "Last item removed was " + items.found[itemIndex].name;
        	items.found.splice(itemIndex,1);

        };
    }


    MenuSearchService.$inject = ['$http', 'ApiBasePath']

    function MenuSearchService($http, ApiBasePath) {
        var service = this;


        // http to gett data from  url and return the expecting data wrapped with promise
        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function(result) {
                if (searchTerm == '') {
                    return result.data.menu_items;
                } else {
                    var foundItems = [];
                    result.data.menu_items.forEach(function(item) {
                        if (searchTerm != '' && item.description.toLowerCase().indexOf(searchTerm) != -1) {
                            foundItems.push(item);
                        }
                    })

                    return foundItems;
                }
            });

        }
    }



})();
