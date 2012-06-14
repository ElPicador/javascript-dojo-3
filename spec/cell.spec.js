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
