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
    };

    Plateau.prototype.addCell = function(x, y) {
      var cell = new Cellule(x, y);
      var gc = new GraphicCell(this.svg, cell, x, y);
      gc.build();
      return cell;
    };

    Plateau.prototype.cellAt = function(x, y) {
      return this.cells[(x % 20 - 1 + 20) * (y % 20 - 1)];
    };

    return Plateau;

  })();

  this.GraphicCell = (function() {

    function GraphicCell(svg, cell, x, y) {
      this.x = x;
      this.y = y;
      this.svg = svg;
      this.cell = cell;
      this.color = 'white';
    }

    GraphicCell.prototype.build = function() {
      this.rect = $(this.svg.rect());
      var that = this;
      this.rect.on('click', function() {
        that.cell.toggle();
        
      });
      this.rect.attr('x', this.x * 20);
      this.rect.attr('y', this.y * 20);
      this.rect.attr('width', 20);
      this.rect.attr('height', 20);
      this.rect.attr('stroke', 'black');
      this.rect.attr('stroke-width', 1);
      return this.rect.attr('fill', this.color);
    };

    GraphicCell.prototype.changeColor = function() {
      return this.rect.attr('fill', this.color);
    };

    return GraphicCell;

  })();

  this.Cellule = (function() {

    function Cellule(x, y) {
      this.x = x;
      this.y = y;
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
