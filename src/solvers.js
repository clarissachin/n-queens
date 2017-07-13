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
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return board;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
