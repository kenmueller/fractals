const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
context.translate(0.5, 0.5)

const drawLine = point1 => point2 => color => {
	context.beginPath()
	context.moveTo(point1.x, point1.y)
	context.lineTo(point2.x, point2.y)
	context.strokeStyle = color
	context.lineWidth = 1
	context.stroke()
}

const drawTriangle = point1 => point2 => point3 => color => {
	drawLine(point1)(point2)(color)
	drawLine(point2)(point3)(color)
	drawLine(point3)(point1)(color)
}

const drawFractal = point1 => point2 => point3 => color => limit => {
	if (limit > 0) {
		const pointA = { x: point1.x + (point2.x - point1.x) / 2, y: point1.y - (point1.y - point2.y) / 2 }
		const pointB = { x: point2.x + (point3.x - point2.x) / 2, y: point2.y - (point2.y - point3.y) / 2 }
		const pointC = { x: point1.x + (point3.x - point1.x) / 2, y: point1.y }
		drawFractal(point1)(pointA)(pointC)(color)(limit - 1)
		drawFractal(pointA)(point2)(pointB)(color)(limit - 1)
		drawFractal(pointC)(pointB)(point3)(color)(limit - 1)
	} else {
		drawTriangle(point1)(point2)(point3)(color)
	}
}