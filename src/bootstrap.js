(function() {

  $(function() {
    var plateau, svg;
    svg = $('#svg');
    svg.svg();
    plateau = new Plateau(svg.svg('get'));
    return plateau.build();
  });

}).call(this);
