$ ->
	svg = $('#svg')
	svg.svg()
	plateau = new Plateau(svg.svg('get'))
	plateau.build()