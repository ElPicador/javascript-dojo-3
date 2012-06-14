describe('plateau', function() {
  beforeEach(function() {
    this.svg = {
      rect: function() {}
    };
    this.plateau = new Plateau(this.svg);
  });

  describe('plateau build', function() {
    beforeEach(function() {
      return this.plateau.build();
    });
    describe('retrieve cells', function() {
      
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

    describe('count surrounding live cells', function(){
      
      it("should return 0 when all surrounding cells are dead", function(){
        expect(this.plateau.countSurroundingLiveCells(1, 1)).toBe(0);
        this.plateau.cellAt(1, 1).toggle();
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
      it("should return 0 when no cells alive around", function(){
        this.plateau.cellAt(2, 2).toggle();
        expect(this.plateau.countSurroundingLiveCells(2, 2)).toBe(0);
      });
    });

    describe('count alive cells', function() {
    
      it("should return 0 when all cells are dead", function() {
        expect(this.plateau.countAliveCells()).toBe(0);
      });

      it("should return 3 when 3 cells are alive", function() {
        this.plateau.cellAt(3,4).toggle();
        this.plateau.cellAt(4,2).toggle();
        this.plateau.cellAt(18,17).toggle();

        expect(this.plateau.countAliveCells()).toBe(3);
      });

      it("should return 400 when all cells are alive", function() {
        for(i = 0 ; i < 20 ; i++) {
          for(j = 0 ; j < 20 ; j++) {
            this.plateau.cellAt(i, j).toggle();
          }
        }
        expect(this.plateau.countAliveCells()).toBe(400);
      });
    });

    describe('evolve plateau', function() {
      it("should return another plateau", function() {
        expect(this.plateau.evolve().constructor.prototype).toBe(Plateau.prototype);
      });

      it("should return another plateau when no cell alive and evolve", function() {
        var nextGen = this.plateau.evolve();
        expect(nextGen.countAliveCells()).toBe(0);
      });

      it("should return another plateau when evolve with three not connected cells alive", function() {
        this.plateau.cellAt(3,4).toggle();
        this.plateau.cellAt(10,7).toggle();
        this.plateau.cellAt(18,17).toggle();
        var nextGen = this.plateau.evolve();
        expect(nextGen.countAliveCells()).toBe(0);
      });

      it("should return another plateau when evolve with three connected cells alive", function() {
        this.plateau.cellAt(3,4).toggle();
        this.plateau.cellAt(3,5).toggle();
        this.plateau.cellAt(3,6).toggle();
        var nextGen = this.plateau.evolve();
        expect(nextGen.countAliveCells()).toBe(3);
        expect(nextGen.cellAt(3, 5).isAlive()).toBeTruthy();
        expect(nextGen.cellAt(4, 5).isAlive()).toBeTruthy();
        expect(nextGen.cellAt(2, 5).isAlive()).toBeTruthy();
      });

    });
  });

  it('can add a cell at coordinates 2, 2', function() {
    var cell;
    cell = this.plateau.addCell(2, 2);
    expect(cell.x).toBe(2);
    return expect(cell.y).toBe(2);
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
});
