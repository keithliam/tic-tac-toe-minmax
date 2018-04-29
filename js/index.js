var myApp = angular.module('myApp', [])

myApp.controller('thisController', ['$scope', function($scope){
    $scope.cells = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    $scope.move = function(cell){}
}])