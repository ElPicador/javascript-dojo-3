$(function() {
  var plateau, svg;
  svg = $('#svg');
  svg.svg();
  plateau = new Plateau(svg.svg('get'));
  plateau.build();

  $("#nextGen").on("click", function() {
  	setInterval(function() {
  		svg.empty();
  		plateau = plateau.evolve();
  	}, 100);
  });
});
