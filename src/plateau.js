(function() {

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
      return this;
    };

    Plateau.prototype.countSurroundingLiveCells = function(x, y) {
      count = 0;
      if(this.cellAt(x - 1, y - 1).isAlive()) {
        count++;
      }
      return 0;
    };

    return Plateau;

  })();

  this.GraphicCell = (function() {

    function GraphicCell(svg, cell, x, y) {
      this.x = x;
      this.y = y;
      this.svg = svg;
      this.cell = cell;
      this.cell.observeToggle($.proxy(this.applyColor, this));
    }

    GraphicCell.prototype.build = function() {
      this.rect = $(this.svg.rect());
      this.rect.on('click', $.proxy(this.cell.toggle, this.cell));
      this.rect.attr('x', this.x * 20);
      this.rect.attr('y', this.y * 20);
      this.rect.attr('width', 20);
      this.rect.attr('height', 20);
      this.rect.attr('stroke', 'black');
      this.rect.attr('stroke-width', 1);
      return this.rect.attr('fill', 'white');
    };

    GraphicCell.prototype.applyColor = function() {
      this.rect.attr('fill', this.cell.isDead() ? 'white' : 'black');
    };

    return GraphicCell;

  })();

  this.Cell = (function() {

    function Cell(x, y, dead) {
      this.x = x;
      this.y = y;
      this.dead = dead;
    }

    Cell.prototype.observeToggle = function(onToggle) {
      this.onToggle = onToggle;
    }

    Cell.prototype.isDead = function() {
      return this.dead;
    }

    Cell.prototype.isAlive = function() {
      return !this.dead;
    }

    Cell.prototype.toggle = function () {
      this.dead = !this.dead;
      if (this.onToggle) this.onToggle(this);
    }

    Cell.prototype.evolve = function(liveCellsAround) {
      switch(liveCellsAround) {
        case 2:
          return this;
        case 3:
          return new Cell(this.x, this.y, false);
        case 0:
        case 1:
        default:
          return new Cell(this.x, this.y, true);
      }
    }

    return Cell;

  })();

}).call(this);
