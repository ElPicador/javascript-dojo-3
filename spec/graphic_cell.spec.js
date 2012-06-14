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
