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