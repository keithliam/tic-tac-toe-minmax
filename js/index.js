var myApp = angular.module('myApp', [])

myApp.controller('thisController', ['$scope', function($scope){
    $scope.cells = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    $scope.firstTurn = 1
    $scope.turn = 1
    $scope.win = false
    $scope.lock = false
    $scope.checkWin = function(){
        const cells = $scope.cells
        if(
            (cells[0][0] && cells[0][0] === cells[0][1] && cells[0][0] === cells[0][2]) ||
            (cells[1][0] && cells[1][0] === cells[1][1] && cells[1][0] === cells[1][2]) ||
            (cells[2][0] && cells[2][0] === cells[2][1] && cells[2][0] === cells[2][2]) ||
            (cells[0][0] && cells[0][0] === cells[1][0] && cells[0][0] === cells[2][0]) ||
            (cells[0][1] && cells[0][1] === cells[1][1] && cells[0][1] === cells[2][1]) ||
            (cells[0][2] && cells[0][2] === cells[1][2] && cells[0][2] === cells[2][2]) ||
            (cells[0][0] && cells[0][0] === cells[1][1] && cells[0][0] === cells[2][2]) ||
            (cells[0][2] && cells[0][2] === cells[1][1] && cells[0][2] === cells[2][0])
            ){
            $scope.win = true
            $scope.lock = true
        } else if(cells[0][0] && cells[0][1] && cells[0][2] && cells[1][0] && cells[1][1] && cells[1][2] && cells[2][0] && cells[2][1] && cells[2][2]){
            $scope.draw = true
            $scope.lock = true
            $scope.turn = $scope.firstTurn === 1? 2 : 1;
            $scope.firstTurn = $scope.turn
        }
    }
    $scope.move = function(row, col){
        if(!$scope.win && !$scope.draw && !$scope.cells[row][col]){
            $scope.cells[row][col] = $scope.turn
            $scope.checkWin()
            if(!$scope.win){
                $scope.turn = $scope.turn === 1? 2 : 1;
            }
        }
    }
    $scope.refresh = function(){
        if($scope.lock){
            $scope.lock = false
        } else if($scope.win || $scope.draw){
            $scope.win = false
            $scope.draw = false
            $scope.cells = [[, 0, 0], [0, 0, 0], [0, 0, 0]]
            $scope.turn = $scope.firstTurn === 1? 2 : 1;
            $scope.firstTurn = $scope.turn
        }
    }
}])