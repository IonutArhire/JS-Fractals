function get_color_not_mbrot(val, accuracy) {
	var r, g, b

	var base = Math.floor((val / accuracy) * 255)

	r = base
	g = base + 50
	b = base + 50

	return 'rgb(' + r + ',' + g + ',' + b + ')'
}

function is_in_mbrot(c, accuracy) {
	z_curr = math.complex(0, 0)
	z_prog = new Set([z_curr.toString()])

	iter = 0

	while (true) {
		iter++

		z_curr = math.add(math.pow(z_curr, 2), c)

		if (math.abs(z_curr) >= 2) {
			return iter
		}

		if (iter == accuracy) {
			return true
		}

		if (z_prog.has(z_curr.toString())) {
			return true
		}

		z_prog.add(z_curr.toString())
	}
}

function paint_in_mirror(ctx, i, j, fillStyle) {
	ctx.fillStyle = fillStyle;
	ctx.fillRect(i, j, 1, 1)
	j == 0 ? undefined : ctx.fillRect(i, -j, 1, 1)
}

function run_mbrot(ctx, x, y, width, zoom, accuracy) {
	for (let i = x; i < x + width; i += 1) {
		for (let j = y; j <= 0; j += 1) {
			c = math.complex(i / zoom, j / zoom)
			mbrot_val = is_in_mbrot(c, accuracy)

			if (mbrot_val === true) {
				paint_in_mirror(ctx, i, j, 'black')
			} else {
				fillStyle = get_color_not_mbrot(mbrot_val, accuracy)
				paint_in_mirror(ctx, i, j, fillStyle)
			}
		}
	}
}

function main() {
	var input_area = document.getElementById("input"),
		input_area_margin_top = parseInt(window.getComputedStyle(input_area).getPropertyValue('margin-top').slice(0, -2))

	var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight - input_area_margin_top - input_area.clientHeight

	ctx.translate(width / 2, height / 2)

	box_width = parseInt(document.getElementById("width").value)
	box_height = parseInt(document.getElementById("height").value)
	zoom = parseInt(document.getElementById("zoom").value)
	accuracy = parseInt(document.getElementById("accuracy").value)

	var x = -box_width / 2,
		y = -box_height / 2

	ctx.strokeStyle = "black"
	ctx.lineWidth = 1.0
	ctx.strokeRect(x, y, box_width, box_height)

	run_mbrot(ctx, x, y, box_width, zoom, accuracy)
}