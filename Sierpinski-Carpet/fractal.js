function put_hole(ctx, x, y, size) {
	ctx.strokeRect(x + size / 3, y + size / 3, size / 3, size / 3)
}

function paint_carpet(ctx, A, x, y, size, nr_cells) {
	A.forEach(function (value, index) {
		if (value == 1) {
			var x_cell = x + index[0] * (size / nr_cells),
				y_cell = y + index[1] * (size / nr_cells)

			put_hole(ctx, x_cell, y_cell, size / nr_cells)
		}
	})
}

function transform_matrix(A, nr_cells, transform_dict) {
	new_nr_cells = nr_cells * 3
	new_matrix = math.zeros(new_nr_cells, new_nr_cells)

	A.forEach(function (value, index) {
		idx_row = index[0] * 3
		idx_col = index[1] * 3
		new_matrix = math.subset(new_matrix, math.index([idx_row, idx_row + 1, idx_row + 2], [idx_col, idx_col + 1, idx_col + 2]), transform_dict[value]);
	})

	return new_matrix
}

function run(ctx, level, x, y, size) {
	zero_transform = math.matrix([
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	])
	one_transform = math.matrix([
		[1, 1, 1],
		[1, 0, 1],
		[1, 1, 1]
	])
	
	transform_dict = {
		0: zero_transform,
		1: one_transform
	}

	var curr_matrix = math.matrix([
		[1]
	])

	var nr_cells = 1

	for (let idx = 0; idx < level - 1; idx++) {
		paint_carpet(ctx, curr_matrix, x, y, size, nr_cells)
		curr_matrix = transform_matrix(curr_matrix, nr_cells, transform_dict)
		nr_cells *= 3
	}

	paint_carpet(ctx, curr_matrix, x, y, size, nr_cells)
}

function main() {
	var input_area = document.getElementById("input"),
		input_area_margin_top = parseInt(window.getComputedStyle(input_area).getPropertyValue('margin-top').slice(0, -2))

	var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight - input_area_margin_top - input_area.clientHeight

	ctx.translate(width / 2, height / 2)

	var level = parseInt(document.getElementById("level").value)
	var size = parseInt(document.getElementById("size").value)

	var	x = y = -size / 2

	ctx.strokeStyle = "black"
	ctx.lineWidth = 2.0
	ctx.strokeRect(x, y, size, size)

	run(ctx, level, x, y, size)
}