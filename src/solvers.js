/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.getBeforeHalf = function(n) {
  return Math.floor(n / 2) - 1;
}

window.hasAnyQueenConflictsOn = function(rowIndex, colIndex, board) {
  console.log(hasAnyMajorDiagonalConflicts(board));
  return (
    this.hasRowConflictAt(rowIndex, board) ||
    this.hasColConflictAt(colIndex, board) ||
    this.hasAnyMajorDiagonalConflicts(board) ||
    this.hasAnyMinorDiagonalConflicts(board)
  );
}

window.hasMajorDiagonalConflictAt = function(majorDiagonalColumnIndexAtFirstRow, board) {
  // console.log('is this thing on?');
  // if a negative number:
    // start from the bottom left-most column (referenced by a negative index)
      // traverse up the first column (i++)
      // on each new index: check the diagonal against board[(-index) + 1][j + 1]
        // push each value at that board's position to an array
        // reduce the array: if queens > 1 return true else return false
  // if a positive number:
    // start from top-left of the board
      // traverse across the board i++
      // on each new index: check the diagonal against board[j + 1][index + 1]
        // push each value at that board's position to an array
        // reduce the array: if queens > 1 return true else return false
  var index = majorDiagonalColumnIndexAtFirstRow;
  var queens = [];
  var positionTracker = 0;
  if (index <= 0) {
    for (var i = -index; i < board[0].length; i++) {
      // console.log('board[-index][positionTracker] is', board[-index][positionTracker]);
      // console.log('queens is ', queens);
      // console.log('board[i][positionTracker is', board[i][positionTracker]);
      // console.log('i is', i);
      queens.push(board[i][positionTracker]);
      // console.log(board)
      positionTracker++;
    }
    return (queens.reduce(function (numQueens, element) { return numQueens + element; }) > 0) ? true : false;
  } else {
    for (var i = index; i < board[0].length; i++) {
      queens.push(board[positionTracker][i]);
      positionTracker++;
    }
    return (queens.reduce(function (numQueens, element) { return numQueens + element; }) > 0) ? true : false;
  }
}

// test if any major diagonals on this board contain conflicts
window.hasAnyMajorDiagonalConflicts = function(board) {
  var result = false;
  // start from the bottom left of the board. directionally move to the top right of the board.
  for (var i = -(board[0].length - 2); i < board[0].length - 1; i++) {
    result = result || this.hasMajorDiagonalConflictAt(i, board);
  }
  return result; // fixme
}

window._getFirstRowColumnIndexForMajorDiagonalOn = function(rowIndex, colIndex, board) {
  return colIndex - rowIndex;
}

window._getFirstRowColumnIndexForMinorDiagonalOn = function(rowIndex, colIndex, board) {
  return colIndex + rowIndex;
}

// Minor Diagonals - go from top-right to bottom-left
// --------------------------------------------------------------
//
// test if a specific minor diagonal on this board contains a conflict
window.hasMinorDiagonalConflictAt = function(minorDiagonalColumnIndexAtFirstRow, board) {
  var index = minorDiagonalColumnIndexAtFirstRow;
  var queens = [];
  var positionTracker = 0;
  if (index <= 0) { //may need to be <
    positionTracker = board[0].length - 1;
    for (var i = -index; i < board[0].length; i++) {
      // console.log('board[-index][positionTracker] is', board[-index][positionTracker]);
      // console.log('queens is ', queens);
      // console.log('board[i][positionTracker is', board[i][positionTracker]);
      // console.log('i is', i);
      queens.push(board[i][positionTracker]);
      // console.log('board is ', board);
      positionTracker--;
    }
    // console.log('queens is', queens);
    return (queens.reduce(function (numQueens, element) { return numQueens + element; }) > 0) ? true : false;
  } else {
    positionTracker = board[0].length - index - 1;
    for (var i = 0; i < board[0].length - index; i++) {
      queens.push(board[i][positionTracker]);
      positionTracker--;
    }
    if (queens.length > 0) {
      return (queens.reduce(function (numQueens, element) { return numQueens + element; }) > 0) ? true : false;
    }
    return; // (queens.reduce(function (numQueens, element) { return numQueens + element; }) > 1) ? true : false;
  }
}

// test if any minor diagonals on this board contain conflicts
window.hasAnyMinorDiagonalConflicts = function(board) {
  var result = false;
  // start from the bottom left of the board. directionally move to the top right of the board.
  for (var i = -(board[0].length - 2); i < board[0].length - 1; i++) {
    result = result || this.hasMinorDiagonalConflictAt(i, board);
  }
  return result; // fixme
}

window.hasAnyRooksConflictsOn = function(rowIndex, colIndex, board) {
  return this.hasRowConflictAt(rowIndex, board) || this.hasColConflictAt(colIndex, board);
}

window.hasRowConflictAt = function(rowIndex, board) {
  // console.log('this is', this);
  // console.log('this.attributes is', this.attributes[rowIndex]);
  // console.log('is this an array?', Array.isArray(this.attributes));
  return (board[rowIndex].reduce(function (queens, element) { return queens + element; }) > 0) ? true : false;
}

window.hasColConflictAt = function(colIndex, board) {
  var col = [];

  for (var row = 0; row < board.length; row++) {
    col.push(board[row][colIndex]);
  }
  return (col.reduce(function (queens, element) { return queens + element; }) > 0) ? true : false;
}

window.createBoard = function(n) {
  var arr = [];
  for (var i = 0; i < n; i++) {
    var subarr = [];
    for (var k = 0; k < n; k++) {
      subarr.push(0);
    }
    arr.push(subarr);
  }
  return arr;
}

window.findNRooksSolution = function(n, row, col, board) {
  board = board || this.createBoard(n); // make an empty board
  row = row || 0; //set undefined rows to 0
  col = col || 0; //set undefined columns to 0
  if (col < n) { //if row is valid
    if (!hasAnyRooksConflictsOn(row, col, board)) { //check if current location is valid
      board[row][col] = 1; //place a rook in current location
      if (row === n - 1) { //if on last row
        // debugger;
        return board; //return first possible solution
      } else {
        row++;
        this.findNRooksSolution(n, row, 0, board); //go to next row
      }
    } else { //if current location is invalid
      if(board[row][col] === 1) {
        board[row][col] = 0;
      }
      col++;
      this.findNRooksSolution(n, row, col, board); //go to next column
    }
  } else { //if row is invalid
    row--;
    this.findNRooksSolution(n, row, 0, board);
  }
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return board;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n, row, col, board, solutionCount) {
  board = board || this.createBoard(n); // make an empty board
  row = row || 0; //set undefined rows to 0
  col = col || 0; //set undefined columns to 0
  solutionCount = solutionCount || 0;
  var firstRun = board[0].reduce(function(sum, queens) {
    return sum + queens;
  }, 0) === 0;
  var checkFirstQueen = function(array) {
    return array.reduce(function(sum, queen) {
    return sum + queen;
    }, 0)
  };
  var beforeHalf = this.getBeforeHalf(n);
  var half = 0;
  if (n % 2 !== 0) {
    half = beforeHalf + 1;
  }
  var firstQueenPosition = board[0].slice(0, beforeHalf + 1);
  if (checkFirstQueen(firstQueenPosition) === 1 || (board[0][half] === 1) || (firstRun === true)) {
    if (col < n) { //if row is valid
      if (!hasAnyRooksConflictsOn(row, col, board)) { //check if current location is valid
        board[row][col] = 1; //place a rook in current location
        if (row === n - 1) { //if on last row (i.e., all queens have been placed on board)
          // debugger;
          if (checkFirstQueen(firstQueenPosition) === 1) {
            solutionCount += 2; //return first possible solution
            // debugger;
          } else {
            solutionCount++;
          }
          if(board[row][col] === 1) {
            board[row][col] = 0;
          }
          if (n > 1) {
            col++;
            return this.countNRooksSolutions(n, row, col, board, solutionCount);
          }
        } else {
          row++;
          return this.countNRooksSolutions(n, row, 0, board, solutionCount); //go to next row
        }
      } else { //if current location is invalid
        if(board[row][col] === 1) {
          board[row][col] = 0;
        }
        col++;
        return this.countNRooksSolutions(n, row, col, board, solutionCount); //go to next column
      }
    } else { //if row is invalid
      row--;
      return this.countNRooksSolutions(n, row, 0, board, solutionCount);
    }
  } // if Q is before half or in half
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  // console.log('final n is', n, 'final solutionCount', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n, row, col, board, solutionCount) {
  if (n === 0) {
    return 1;
  }
  board = board || this.createBoard(n); // make an empty board
  row = row || 0; //set undefined rows to 0
  col = col || 0; //set undefined columns to 0
  solutionCount = solutionCount || 0;
  var firstRun = board[0].reduce(function(sum, queens) {
    return sum + queens;
  }, 0) === 0;
  var checkFirstQueen = function(array) {
    return array.reduce(function(sum, queen) {
    return sum + queen;
    }, 0)
  };
  var beforeHalf = this.getBeforeHalf(n);
  var half = 0;
  if (n % 2 !== 0) {
    half = beforeHalf + 1;
  }
  var firstQueenPosition = board[0].slice(0, beforeHalf + 1);
  if (checkFirstQueen(firstQueenPosition) === 1 || (board[0][half] === 1) || (firstRun === true)) {
    if (col < n) { //if row is valid
      if (!hasAnyQueenConflictsOn(row, col, board)) { //check if current location is valid
        board[row][col] = 1; //place a rook in current location
        if (row === n - 1) { //if on last row (i.e., all queens have been placed on board)
          // debugger;
          if (checkFirstQueen(firstQueenPosition) === 1) {
            solutionCount += 2; //return first possible solution
            // debugger;
          } else {
            solutionCount++;
          }
          if(board[row][col] === 1) {
            board[row][col] = 0;
          }
          if (n > 1) {
            col++;
            return this.countNQueensSolutions(n, row, col, board, solutionCount);
          }
        } else {
          row++;
          return this.countNQueensSolutions(n, row, 0, board, solutionCount); //go to next row
        }
      } else { //if current location is invalid
        if(board[row][col] === 1) {
          board[row][col] = 0;
        }
        col++;
        return this.countNQueensSolutions(n, row, col, board, solutionCount); //go to next column
      }
    } else { //if row is invalid
      row--;
      return this.countNQueensSolutions(n, row, 0, board, solutionCount);
    }
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
