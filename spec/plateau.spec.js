(function() {

  describe("cells ui", function() {
    beforeEach(function() {
      this.svg = {
        rect: function() { return '<div/>';}
      };
      spyOn(this.svg, 'rect').andCallThrough();
      spyOn($.fn, 'attr');
      this.cell = new GraphicCell(this.svg, new Cell(0, 0, true), 0, 0);
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
    it('handles on click', function() {
      expect(this.cell.rect).toHandle('click');
    });

    it('changes on color on click', function() {
      this.cell.rect.click();
      expect(this.cell.rect.attr).toHaveBeenCalledWith('fill', 'black');
    });

    it('apply white when the cell is dead', function() {
      this.cell.cell.dead = true;
      this.cell.applyColor();
      expect(this.cell.rect.attr).toHaveBeenCalledWith('fill', 'white');
    });

    it('apply black when the cell is dead', function() {
      this.cell.cell.dead = false;
      this.cell.applyColor();
      expect(this.cell.rect.attr).toHaveBeenCalledWith('fill', 'black');
    });
  });

  describe('cells behavior', function() {
    beforeEach(function() {
      this.cell = new Cell(0, 0, true);
    });
    it('is dead on creation',function() {
      expect(this.cell.isDead()).toBeTruthy();
    });
    it('can be made alive', function () {
      this.cell.toggle();
      expect(this.cell.isDead()).toBeFalsy();
      expect(this.cell.isAlive()).toBeTruthy();
    });
    it('can be made dead again', function () {
      this.cell.toggle();
      this.cell.toggle();
      expect(this.cell.isDead()).toBeTruthy();
      expect(this.cell.isAlive()).toBeFalsy();
    });

    describe('When starting with a dead cell', function(){
      it('should be dead if surrounded by 0 cells', function() {
        expect(this.cell.evolve(0).isDead()).toBeTruthy();
      });

      it('should be dead if surrounded by 1 cells', function() {
        expect(this.cell.evolve(1).isDead()).toBeTruthy();
      });

      it('should be dead if surrounded by 2 cells', function() {
        expect(this.cell.evolve(2).isDead()).toBeTruthy();
      });

      it('should be alive if surrounded by 3 cells', function() {
        expect(this.cell.evolve(3).isAlive()).toBeTruthy();
      });

      it('should be dead if surrounded by more than 3 cells', function() {
        expect(this.cell.evolve(4).isDead()).toBeTruthy();
        expect(this.cell.evolve(5).isDead()).toBeTruthy();
        expect(this.cell.evolve(6).isDead()).toBeTruthy();
        expect(this.cell.evolve(7).isDead()).toBeTruthy();
        expect(this.cell.evolve(8).isDead()).toBeTruthy();
      });
    });

    describe('When starting with a live cell', function(){
      beforeEach(function(){
        this.cell.toggle();
      });
      it('should be dead if surrounded by 0 cells', function() {
        expect(this.cell.evolve(0).isDead()).toBeTruthy();
      });

      it('should be dead if surrounded by 1 cells', function() {
        expect(this.cell.evolve(1).isDead()).toBeTruthy();
      });

      it('should be alive if surrounded by 2 cells', function() {
        expect(this.cell.evolve(2).isDead()).toBeFalsy();
      });

      it('should be alive if surrounded by 3 cells', function() {
        expect(this.cell.evolve(3).isAlive()).toBeTruthy();
      });

      it('should be dead if surrounded by more than 3 cells', function() {
        expect(this.cell.evolve(4).isDead()).toBeTruthy();
        expect(this.cell.evolve(5).isDead()).toBeTruthy();
        expect(this.cell.evolve(6).isDead()).toBeTruthy();
        expect(this.cell.evolve(7).isDead()).toBeTruthy();
        expect(this.cell.evolve(8).isDead()).toBeTruthy();
      });
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
      it('can retrieve a cell at coordinates 0, 0', function() {
        var cell;
        cell = this.plateau.cellAt(0, 0);
        expect(cell.x).toBe(0);
        expect(cell.y).toBe(0);
      });
      it('has a torroid board on x', function() {
        var cell1, cell21;
        cell21 = this.plateau.cellAt(21, 1);
        cell1 = this.plateau.cellAt(1, 1);
        expect(cell21.x).toBe(1);
        expect(cell21.y).toBe(1);
        expect(cell21).toBe(cell1);
      });
      it('has a torroid board on y', function() {
        var cell1, cell21;
        cell21 = this.plateau.cellAt(1, 21);
        cell1 = this.plateau.cellAt(1, 1);
        expect(cell21.x).toBe(1);
        expect(cell21.y).toBe(1);
        expect(cell21).toBe(cell1);
      });

      it('should return cells on negative coordinates', function() {
        cell_1 = this.plateau.cellAt(-1, -1);
        cell19 = this.plateau.cellAt(19, 19);
        expect(cell_1.x).toBe(19);
        expect(cell_1.y).toBe(19);
        expect(cell_1).toBe(cell19);
      });

      it('should return cells on negative coordinates', function() {
        cell_1 = this.plateau.cellAt(-21, -21);
        cell19 = this.plateau.cellAt(19, 19);
        expect(cell_1.x).toBe(19);
        expect(cell_1.y).toBe(19);
        expect(cell_1).toBe(cell19);
      });
    });
    describe('build plateau', function() {
      beforeEach(function() {
        spyOn(this.plateau, 'addCell');
        return this.plateau.build();
      });
      it('draws a grid of 20x20 cells', function() {
        return expect(this.plateau.addCell.callCount).toBe(20 * 20);
      });
      it('draws a cell at (1, 1), (9, 10) and (19, 19)', function() {
        expect(this.plateau.addCell).toHaveBeenCalledWith(1, 1);
        expect(this.plateau.addCell).toHaveBeenCalledWith(9, 10);
        expect(this.plateau.addCell).toHaveBeenCalledWith(19, 19);
      });
      it('does not draw a cell at (21, 21)', function() {
        expect(this.plateau.addCell).not.toHaveBeenCalledWith(21, 21);
      });
    });

    describe('count surrounding live cells', function(){
      beforeEach(function() {
        this.plateau.build();
      })
      it("should return 0 when all surrounding cells are dead", function(){
        expect(this.plateau.countSurroundingLiveCells(1, 1)).toBe(0);
        this.plateau.cellAt(1, 1).toggle();
        expect(this.plateau.countSurroundingLiveCells(1, 1)).toBe(0);
      });
      it("should return 8 when all cells are alive", function(){
        this.plateau.cellAt(1, 1).toggle();
        this.plateau.cellAt(1, 2).toggle();
        this.plateau.cellAt(1, 3).toggle();
        this.plateau.cellAt(2, 1).toggle();
        this.plateau.cellAt(2, 3).toggle();
        this.plateau.cellAt(3, 1).toggle();
        this.plateau.cellAt(3, 2).toggle();
        this.plateau.cellAt(3, 3).toggle();
        expect(this.plateau.countSurroundingLiveCells(2, 2)).toBe(8);
      });
    });

    describe('evolve plateau', function() {
      it("should return another plateau", function() {
        expect(this.plateau.evolve().constructor.prototype).toBe(Plateau.prototype);
      });
    });
  });

}).call(this);
