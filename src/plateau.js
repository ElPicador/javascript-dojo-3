this.Plateau = (function() {

  function Plateau(svg) {
    this.svg = svg;
    this.cells = [];
  }

  Plateau.prototype.build = function() {
    var i, j;
    for (i = 0; i < 20; i++) {
      for (j = 0; j < 20; j++) {
        this.cells.push(this.addCell(i, j));
      }
    }
  };

  Plateau.prototype.addCell = function(x, y) {
    var cell = new Cell(x, y, true);
    var gc = new GraphicCell(this.svg, cell, x, y);
    gc.build();
    return cell;
  };

  Plateau.prototype.cellAt = function(x, y) {
    modulo_x = x % 20;
    if(modulo_x < 0) {
      modulo_x = modulo_x + 20;
    }
    modulo_y = y % 20;
    if(modulo_y < 0) {
      modulo_y = modulo_y + 20;
    }
    return this.cells[(modulo_x) * 20 + (modulo_y)];
  };

  Plateau.prototype.evolve = function() {
    var plateau = new Plateau(this.svg);
    plateau.build();
    for(i = 0 ; i < 20 ; i++) {
      for(j = 0 ; j < 20 ; j++) {
        newCell = this.cellAt(i,j).evolve(this.countSurroundingLiveCells(i,j));
        if(newCell.isAlive()) {
          plateau.cellAt(i, j).toggle();
        }
      }
    }
    return plateau;
  };

  Plateau.prototype.countSurroundingLiveCells = function(x, y) {
    var count = 0;
    var currentCell = this.cellAt(x,y);
    for (var i = x - 1; i <= x+1; i++) {
      for (var j = y - 1; j <= y + 1; j++) {
        aroundCell = this.cellAt(i,j);
        if(aroundCell.isAlive() && !(aroundCell === currentCell)) {
          count++;
       }
     };
    };
    return count;
  };

  Plateau.prototype.countAliveCells = function() {
    count = 0;
    for(i = 0 ; i < 20 ; i++) {
      for(j = 0 ; j < 20 ; j++) {
        if(this.cellAt(i, j).isAlive()) {
          count++;
        }
      }
    }
    return count;
  };

  return Plateau;

})();
