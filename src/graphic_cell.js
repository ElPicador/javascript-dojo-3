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