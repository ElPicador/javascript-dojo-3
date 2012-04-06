describe "cellule", ->
	beforeEach ->
		@svg = 
			rect: ->

		spyOn @svg, 'rect'
		spyOn $.fn, 'attr'
		@cell = new Cellule(@svg, 0, 0)
		@cell.build()

	it 'draws a square', ->
		expect(@svg.rect).toHaveBeenCalled()

	it 'draws a square at 0 0', ->
		expect($.fn.attr).toHaveBeenCalledWith 'x', 0
		expect($.fn.attr).toHaveBeenCalledWith 'y', 0

	it 'draws a square of 20x20', ->
		expect($.fn.attr).toHaveBeenCalledWith 'width', 20
		expect($.fn.attr).toHaveBeenCalledWith 'height', 20

	it 'draws a square with white background', ->
		expect($.fn.attr).toHaveBeenCalledWith 'fill', 'white'
		
	it 'draws a square with black border', ->
		expect($.fn.attr).toHaveBeenCalledWith 'stroke', 'black'
		expect($.fn.attr).toHaveBeenCalledWith 'stroke-width', 1

	it 'changes color', ->
		@cell.changeColor('red')
		expect($.fn.attr).toHaveBeenCalledWith 'fill', 'red'

describe 'plateau', ->
	beforeEach ->
		@svg = 
			rect: ->		
		@plateau = new Plateau(@svg)

	it 'can add a cell at coordinates 2, 2', ->
		cell = @plateau.addCell(2, 2)
		expect(cell.x).toBe 2
		expect(cell.y).toBe 2

	describe 'retrieve cells', ->
		beforeEach ->
			@plateau.build()

		it 'can retrieve a cell at coordinates 2, 2', ->
			cell = @plateau.cellAt(2, 2)
			expect(cell.x).toBe 2
			expect(cell.y).toBe 2

		it 'has a torroid board on x', ->
			cell21 = @plateau.cellAt(21, 1)
			cell1 = @plateau.cellAt(1, 1)

			expect(cell21.x).toBe 1
			expect(cell21.y).toBe 1
			expect(cell21).toBe cell1

		it 'has a torroid board on y', ->
			cell21 = @plateau.cellAt(1, 21)
			cell1 = @plateau.cellAt(1, 1)
			
			expect(cell21.x).toBe 1
			expect(cell21.y).toBe 1
			expect(cell21).toBe cell1


	describe 'build plateau', ->
		beforeEach ->
			spyOn @plateau, 'addCell'
			@plateau.build()

		it 'draws a grid of 20x20 cells', ->
			expect(@plateau.addCell.callCount).toBe 20*20

		it 'draws a cell at (1, 1), (9, 10) and (20, 20)', ->
			expect(@plateau.addCell).toHaveBeenCalledWith 1, 1
			expect(@plateau.addCell).toHaveBeenCalledWith 9, 10
			expect(@plateau.addCell).toHaveBeenCalledWith 20, 20

		it 'does not draw a cell at (21, 21)', ->
			expect(@plateau.addCell).not.toHaveBeenCalledWith 21, 21

		