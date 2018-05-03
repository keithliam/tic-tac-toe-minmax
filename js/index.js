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

myApp.controller('thisController', ['$scope', function($scope){
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
    	const none = !$scope.cells[row][col]
        if(!$scope.win && !$scope.draw && none){
            $scope.cells[row][col] = 1
            $scope.checkWin()
        }
        if(!$scope.win && !$scope.draw && none){
        	$scope.AImakeMove()
            $scope.checkWin()
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
            if($scope.firstTurn === 2){
        		$scope.AImakeMove()
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
            if($scope.colorizeNumber < 9){
                $scope.colorizeNumber++
            } else {
                $scope.colorizeNumber = 1
            }
            $scope.colorize = 'colorize' + $scope.colorizeNumber
        }
    }

    $scope.AImakeMove = function(){
	    const coordinates = $scope.AIgetNextMove()
	    $scope.cells[coordinates[0]][coordinates[1]] = 2
    }
    $scope.AIgetNextMove = function(){
    	const nextMoves = $scope.AInextMoves($scope.cells)
    	var max = -1
    	var bestMove = 0
    	var temp
    	for(var i = 0; i < nextMoves.length; i++){
    		temp = $scope.AImin($scope.AInextState($scope.cells, nextMoves[i][0], nextMoves[i][1], 2))
    		if(temp === 1){
    			bestMove = i
    			break
    		} else if(temp > max){
    			max = temp
    			bestMove = i
    		}
    	}
    	return [nextMoves[bestMove][0], nextMoves[bestMove][1]]
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
    			if(state[row][col] === 0){
    				moves.push([row, col])
    			}
    		}
    	}
    	return moves
    }
    $scope.AInextState = function(state, row, col,turn){
    	state = state.clone()
    	state[row][col] = turn
    	return state
    }
	$scope.AImin = function(state){
		var won = $scope.AIisTerminal(state)
		if(won === -1){
			const nextMoves = $scope.AInextMoves(state)
	    	var min = 1
	    	var temp
	    	for(var i = 0; i < nextMoves.length; i++){
	    		temp = $scope.AImax($scope.AInextState(state, nextMoves[i][0], nextMoves[i][1], 1))
	    		if(temp === -1){
	    			return -1
	    		} else if(temp < min){
	    			min = temp
	    		}
	    	}
	    	return min
	    } else {
	    	return won
	    }
	}
    $scope.AImax = function(state){
		var lost = $scope.AIisTerminal(state)
		if(lost === -1){
			const nextMoves = $scope.AInextMoves(state)
	    	var max = -1
	    	var temp
	    	for(var i = 0; i < nextMoves.length; i++){
	    		temp = $scope.AImin($scope.AInextState(state, nextMoves[i][0], nextMoves[i][1], 2))
	    		if(temp === 1){
	    			return 1
	    		} else if(temp > max){
	    			max = temp
	    		}
	    	}
	    	return max
	    } else if(lost === 1){
	    	return -1
	    } else {
	    	return 0
	    }

    }
}])