(function() {

  describe("cells ui", function() {
    beforeEach(function() {
      this.svg = {
        rect: function() { return '<div/>';}
      };
      spyOn(this.svg, 'rect').andCallThrough();
      spyOn($.fn, 'attr');
      this.cell = new GraphicCell(this.svg, 0, 0);
      return this.cell.build();
    });
    it('draws a square', function() {
      return expect(this.svg.rect).toHaveBeenCalled();
    });
    it('draws a square at 0 0', function() {
      expect($.fn.attr).toHaveBeenCalledWith('x', 0);
      return expect($.fn.attr).toHaveBeenCalledWith('y', 0);
    });
    it('draws a square of 20x20', function() {
      expect($.fn.attr).toHaveBeenCalledWith('width', 20);
      return expect($.fn.attr).toHaveBeenCalledWith('height', 20);
    });
    it('draws a square with white background', function() {
      return expect($.fn.attr).toHaveBeenCalledWith('fill', 'white');
    });
    it('draws a square with black border', function() {
      expect($.fn.attr).toHaveBeenCalledWith('stroke', 'black');
      return expect($.fn.attr).toHaveBeenCalledWith('stroke-width', 1);
    });
    it('changes color', function() {
      this.cell.changeColor('red');
      return expect($.fn.attr).toHaveBeenCalledWith('fill', 'red');
    });

    it('handles on click', function() {
      expect(this.cell.rect).toHandle('click');
    });

   
  });

  describe('cells behavior', function() {
    beforeEach(function() {
      this.cell = new Cellule(null, 0, 0);
    });
    it('is dead on creation',function() {
      expect(this.cell.isDead()).toBeTruthy();
    });
    it('can be made alive', function () {
      this.cell.toggle();
      expect(this.cell.isDead()).toBeFalsy();
    });
    it('can be made dead again', function () {
      this.cell.toggle();
      this.cell.toggle();
      expect(this.cell.isDead()).toBeTruthy();
    });
  });

  describe('plateau', function() {
    beforeEach(function() {
      this.svg = {
        rect: function() {}
      };
      return this.plateau = new Plateau(this.svg);
    });
    it('can add a cell at coordinates 2, 2', function() {
      var cell;
      cell = this.plateau.addCell(2, 2);
      expect(cell.x).toBe(2);
      return expect(cell.y).toBe(2);
    });
    describe('retrieve cells', function() {
      beforeEach(function() {
        return this.plateau.build();
      });
      it('can retrieve a cell at coordinates 2, 2', function() {
        var cell;
        cell = this.plateau.cellAt(2, 2);
        expect(cell.x).toBe(2);
        return expect(cell.y).toBe(2);
      });
      it('has a torroid board on x', function() {
        var cell1, cell21;
        cell21 = this.plateau.cellAt(21, 1);
        cell1 = this.plateau.cellAt(1, 1);
        expect(cell21.x).toBe(1);
        expect(cell21.y).toBe(1);
        return expect(cell21).toBe(cell1);
      });
      return it('has a torroid board on y', function() {
        var cell1, cell21;
        cell21 = this.plateau.cellAt(1, 21);
        cell1 = this.plateau.cellAt(1, 1);
        expect(cell21.x).toBe(1);
        expect(cell21.y).toBe(1);
        return expect(cell21).toBe(cell1);
      });
    });
    return describe('build plateau', function() {
      beforeEach(function() {
        spyOn(this.plateau, 'addCell');
        return this.plateau.build();
      });
      it('draws a grid of 20x20 cells', function() {
        return expect(this.plateau.addCell.callCount).toBe(20 * 20);
      });
      it('draws a cell at (1, 1), (9, 10) and (20, 20)', function() {
        expect(this.plateau.addCell).toHaveBeenCalledWith(1, 1);
        expect(this.plateau.addCell).toHaveBeenCalledWith(9, 10);
        return expect(this.plateau.addCell).toHaveBeenCalledWith(20, 20);
      });
      return it('does not draw a cell at (21, 21)', function() {
        return expect(this.plateau.addCell).not.toHaveBeenCalledWith(21, 21);
      });
    });
  });

}).call(this);
