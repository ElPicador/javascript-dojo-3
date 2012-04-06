class @Plateau

	constructor: (@svg) ->
		@cells = [ ]

	build: () ->
		for i in [1..20]
			for j in [1..20]
				@cells.push @addCell(i, j)
		console.log @cells

	addCell: (x, y) ->
		cell = new Cellule(@svg, x, y)
		cell.build()
		cell

	cellAt: (x, y) ->
		@cells[ (x%20 - 1 + 20) * (y%20 - 1) ]

class @Cellule
	constructor: (svg, @x, @y) ->
		@rect = $ svg.rect()

	build: () ->
		@rect.attr('x', @x*20)
		@rect.attr('y', @y*20)
		@rect.attr('width', 20)
		@rect.attr('height', 20)		
		@rect.attr('stroke', 'black')
		@rect.attr('stroke-width', 1)
		@changeColor('white')

	changeColor: (color) ->
		@rect.attr('fill', color)
