(function() {

  this.Plateau = (function() {

    function Plateau(svg) {
      this.svg = svg;
      this.cells = [];
    }

    Plateau.prototype.build = function() {
      var i, j;
      for (i = 1; i <= 20; i++) {
        for (j = 1; j <= 20; j++) {
          this.cells.push(this.addCell(i, j));
        }
      }
      return console.log(this.cells);
    };

    Plateau.prototype.addCell = function(x, y) {
      var cell;
      cell = new GraphicCell(this.svg, x, y);
      cell.build();
      return cell;
    };

    Plateau.prototype.cellAt = function(x, y) {
      return this.cells[(x % 20 - 1 + 20) * (y % 20 - 1)];
    };

    return Plateau;

  })();

  this.GraphicCell = (function() {

    function GraphicCell(svg, x, y) {
      this.x = x;
      this.y = y;
      this.svg = svg;
    }

    GraphicCell.prototype.build = function() {
      this.rect = $(this.svg.rect());
      var that = this;
      this.rect.on('click', function() {
      });
      this.rect.attr('x', this.x * 20);
      this.rect.attr('y', this.y * 20);
      this.rect.attr('width', 20);
      this.rect.attr('height', 20);
      this.rect.attr('stroke', 'black');
      this.rect.attr('stroke-width', 1);
      return this.changeColor('white');
    };

    GraphicCell.prototype.changeColor = function(color) {
      return this.rect.attr('fill', color);
    };

    return GraphicCell;

  })();

  this.Cellule = (function() {

    function Cellule(svg, x, y) {
      this.x = x;
      this.y = y;
      this.svg = svg;
      this.dead = true;
    }

    Cellule.prototype.isDead = function() {
      return this.dead;
    }

    Cellule.prototype.toggle = function () {
      this.dead = !this.dead;
    }

 
    return Cellule;

  })();

}).call(this);
