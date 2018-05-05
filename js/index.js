Array.prototype.clone = function(arr){
    var arr = arguments[0] == null? [] : arguments[0] 
    for(var p = 0; p < this.length; p++){
        if(this[p] instanceof Array){
            var sub = [] ;
            this[p].clone(sub) ;
            arr.push(sub.slice(0));
        } else {
            arr.push(this[p])
        }
    }
    return arr
}

var myApp = angular.module('myApp', ['ngAnimate'])

myApp.controller('thisController', ['$scope', '$timeout', function($scope, $timeout){
    $scope.cells = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    $scope.is1Player = true
    $scope.turn = 1
    $scope.firstTurn = 1
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
    $scope.AIchoosing = false
    $scope.changePlayers = function(){
        $scope.is1Player = !$scope.is1Player
        $scope.cells = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        $scope.turn = 1
        $scope.firstTurn = 1
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
        $scope.AIchoosing = false
    }
    $scope.checkWin = function(isAI){
        const cells = $scope.cells
        $scope.win = true
        $scope.lock = isAI? false : true
        $scope.turn = $scope.turn === 1? 2 : 1
        if(cells[0][0] && cells[0][0] === cells[0][1] && cells[0][0] === cells[0][2]){
            $scope.cell00 = true
            $scope.cell01 = true
            $scope.cell02 = true
        } else if(cells[1][0] && cells[1][0] === cells[1][1] && cells[1][0] === cells[1][2]){
            $scope.cell10 = true
            $scope.cell11 = true
            $scope.cell12 = true
        } else if(cells[2][0] && cells[2][0] === cells[2][1] && cells[2][0] === cells[2][2]){
            $scope.cell20 = true
            $scope.cell21 = true
            $scope.cell22 = true
        } else if(cells[0][0] && cells[0][0] === cells[1][0] && cells[0][0] === cells[2][0]){
            $scope.cell00 = true
            $scope.cell10 = true
            $scope.cell20 = true
        } else if(cells[0][1] && cells[0][1] === cells[1][1] && cells[0][1] === cells[2][1]){
            $scope.cell01 = true
            $scope.cell11 = true
            $scope.cell21 = true
        } else if(cells[0][2] && cells[0][2] === cells[1][2] && cells[0][2] === cells[2][2]){
            $scope.cell02 = true
            $scope.cell12 = true
            $scope.cell22 = true
        } else if(cells[0][0] && cells[0][0] === cells[1][1] && cells[0][0] === cells[2][2]){
            $scope.cell00 = true
            $scope.cell11 = true
            $scope.cell22 = true
        } else if(cells[0][2] && cells[0][2] === cells[1][1] && cells[0][2] === cells[2][0]){
            $scope.cell02 = true
            $scope.cell11 = true
            $scope.cell20 = true
        } else {
            const stringified = cells.toString()
            if(stringified.indexOf('0') < 0){
                $scope.win = false
                $scope.draw = true
                $scope.lock = isAI? false : true
                $scope.turn = $scope.turn === 1? 2 : 1
            } else {
                $scope.win = false
                $scope.lock = false
                $scope.turn = $scope.turn === 1? 2 : 1
            }
        }
    }
    $scope.move = function(row, col){
        const none = !$scope.cells[row][col]
        if(!$scope.win && !$scope.draw && none && !$scope.AIchoosing){
            if($scope.is1Player && $scope.turn === 1){
                $scope.turn = 2
                $scope.cells[row][col] = 1
                $scope.checkWin(false)
                if(!$scope.win && !$scope.draw){
                    $scope.AIchoosing = true
                    $scope.AImakeMove(function(){
                        $scope.turn = 1
                        $scope.checkWin(true)
                        $scope.AIchoosing = false
                    })
                }
            } else if(!$scope.is1Player) {
                $scope.cells[row][col] = $scope.turn
                $scope.turn = $scope.turn === 1? 2 : 1
                $scope.checkWin(false)
            }
        }
    }
    $scope.refresh = function(){
        if($scope.lock){
            $scope.lock = false 
        } else if($scope.win || $scope.draw){
            $scope.win = false
            $scope.draw = false
            $scope.cells = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
            $scope.firstTurn = $scope.firstTurn === 1? 2 : 1;
            $scope.turn = $scope.firstTurn
            if($scope.is1Player && $scope.firstTurn === 2 && !$scope.win && !$scope.draw && !$scope.AIchoosing){
                $scope.AIchoosing = true
                $scope.AImakeMove(function(){
                    $scope.AIchoosing = false
                    $scope.turn = 1
                })
            }
            $scope.cell00 = false
            $scope.cell01 = false
            $scope.cell02 = false
            $scope.cell10 = false
            $scope.cell11 = false
            $scope.cell12 = false
            $scope.cell20 = false
            $scope.cell21 = false
            $scope.cell22 = false
            if($scope.colorizeNumber < 9) $scope.colorizeNumber++
            else $scope.colorizeNumber = 1
            $scope.colorize = 'colorize' + $scope.colorizeNumber
        }
    }

    $scope.AImakeMove = function(callback){
        const nextMoves = $scope.AInextMoves($scope.cells)
        var max = -999
        var values = []
        var bestMoves = []
        var value
        nextMoves.map(function(move, i){
            value = $scope.AImin($scope.AInextState($scope.cells, move, 2), max)
            values.push(value)
            if(value > max) max = value
        })
        values.map(function(value, i){
            if(value === max) bestMoves.push(i)
        })
        const move = Math.floor(Math.random() * bestMoves.length)
        $timeout(function(){
            const coordinates = nextMoves[bestMoves[move]]
            $scope.cells[coordinates[0]][coordinates[1]] = 2
            callback()
        }, 1000)
    }
    $scope.AImin = function(state, alpha){
        var won = $scope.AIisTerminal(state)
        if(won === -1){
            const nextMoves = $scope.AInextMoves(state)
            var min = 999
            var value
            for(var i = 0; i < nextMoves.length; i++){
                value = $scope.AImax($scope.AInextState(state, nextMoves[i], 1), min)
                if(value < alpha) return value
                if(value < min) min = value
            }
            return min
        } else {
            return won
        }
    }
    $scope.AImax = function(state, beta){
        var lost = $scope.AIisTerminal(state)
        if(lost === -1){
            const nextMoves = $scope.AInextMoves(state)
            var max = -999
            var value
            for(var i = 0; i < nextMoves.length; i++){
                value = $scope.AImin($scope.AInextState(state, nextMoves[i], 2), max)
                if(value > beta) return value
                if(value > max) max = value
            }
            return max
        } else if(lost === 1){
            return -1
        } else {
            return 0
        }
    }
    $scope.AIisTerminal = function(state){
        if(
            (state[0][0] && state[0][0] === state[0][1] && state[0][0] === state[0][2]) ||
            (state[1][0] && state[1][0] === state[1][1] && state[1][0] === state[1][2]) ||
            (state[2][0] && state[2][0] === state[2][1] && state[2][0] === state[2][2]) ||
            (state[0][0] && state[0][0] === state[1][0] && state[0][0] === state[2][0]) ||
            (state[0][1] && state[0][1] === state[1][1] && state[0][1] === state[2][1]) ||
            (state[0][2] && state[0][2] === state[1][2] && state[0][2] === state[2][2]) ||
            (state[0][0] && state[0][0] === state[1][1] && state[0][0] === state[2][2]) ||
            (state[0][2] && state[0][2] === state[1][1] && state[0][2] === state[2][0])
            ){
            return 1
        } else if(state[0][0] && state[0][1] && state[0][2] && state[1][0] && state[1][1] && state[1][2] && state[2][0] && state[2][1] && state[2][2]){
            return 0
        } else {
            return -1
        }
    }
    $scope.AInextMoves = function(state){
        var moves = []
        for(var row = 0; row < 3; row++){
            for(var col = 0; col < 3; col++){
                if(state[row][col] === 0) moves.push([row, col])
            }
        }
        return moves
    }
    $scope.AInextState = function(state, rowCol,turn){
        state = state.clone()
        state[rowCol[0]][rowCol[1]] = turn
        return state
    }
}])