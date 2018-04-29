var myApp = angular.module('myApp', ['ngAnimate'])

myApp.controller('thisController', ['$scope', function($scope){
    $scope.cells = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    $scope.firstTurn = 1
    $scope.turn = 1
    $scope.win = false
    $scope.draw = false
    $scope.lock = false
    $scope.cell00 = false
    $scope.cell01 = false
    $scope.cell02 = false
    $scope.cell10 = false
    $scope.cell11 = false
    $scope.cell12 = false
    $scope.cell20 = false
    $scope.cell21 = false
    $scope.cell22 = false
    $scope.colorizeNumber = 1
    $scope.colorize = 'colorize1'
    $scope.checkWin = function(){
        const cells = $scope.cells
        if(cells[0][0] && cells[0][0] === cells[0][1] && cells[0][0] === cells[0][2]){
            $scope.cell00 = true
            $scope.cell01 = true
            $scope.cell02 = true
            $scope.win = true
            $scope.lock = true
        } else if(cells[1][0] && cells[1][0] === cells[1][1] && cells[1][0] === cells[1][2]){
            $scope.cell10 = true
            $scope.cell11 = true
            $scope.cell12 = true
            $scope.win = true
            $scope.lock = true
        } else if(cells[2][0] && cells[2][0] === cells[2][1] && cells[2][0] === cells[2][2]){
            $scope.cell20 = true
            $scope.cell21 = true
            $scope.cell22 = true
            $scope.win = true
            $scope.lock = true
        } else if(cells[0][0] && cells[0][0] === cells[1][0] && cells[0][0] === cells[2][0]){
            $scope.cell00 = true
            $scope.cell10 = true
            $scope.cell20 = true
            $scope.win = true
            $scope.lock = true
        } else if(cells[0][1] && cells[0][1] === cells[1][1] && cells[0][1] === cells[2][1]){
            $scope.cell01 = true
            $scope.cell11 = true
            $scope.cell21 = true
            $scope.win = true
            $scope.lock = true
        } else if(cells[0][2] && cells[0][2] === cells[1][2] && cells[0][2] === cells[2][2]){
            $scope.cell02 = true
            $scope.cell12 = true
            $scope.cell22 = true
            $scope.win = true
            $scope.lock = true
        } else if(cells[0][0] && cells[0][0] === cells[1][1] && cells[0][0] === cells[2][2]){
            $scope.cell00 = true
            $scope.cell11 = true
            $scope.cell22 = true
            $scope.win = true
            $scope.lock = true
        } else if(cells[0][2] && cells[0][2] === cells[1][1] && cells[0][2] === cells[2][0]){
            $scope.cell02 = true
            $scope.cell11 = true
            $scope.cell20 = true
            $scope.win = true
            $scope.lock = true
        } else if(cells[0][0] && cells[0][1] && cells[0][2] && cells[1][0] && cells[1][1] && cells[1][2] && cells[2][0] && cells[2][1] && cells[2][2]){
            $scope.draw = true
            $scope.lock = true
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
            $scope.cell00 = false
            $scope.cell01 = false
            $scope.cell02 = false
            $scope.cell10 = false
            $scope.cell11 = false
            $scope.cell12 = false
            $scope.cell20 = false
            $scope.cell21 = false
            $scope.cell22 = false
            if($scope.colorizeNumber < 9){
                $scope.colorizeNumber++
            } else {
                $scope.colorizeNumber = 1
            }
            $scope.colorize = 'colorize' + $scope.colorizeNumber
        }
    }
}])