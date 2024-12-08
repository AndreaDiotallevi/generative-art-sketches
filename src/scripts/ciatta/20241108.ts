import p5 from "p5"
import { canvasWidth, canvasHeight } from "@utils/globals"

export const sketch = (p5: p5) => {
    const radius = canvasWidth / 20
    const minRadius = radius / 7
    const circleSize = radius / 4

    const getRandomColour = () => {
        const colours = [
            p5.color(8, 100, 100), // Orange
            p5.color(15, 100, 100), // Yellow
            p5.color(65, 100, 100), // Blue
            p5.color(100, 100, 100), // Red
        ]

        const randomNum = Math.floor(p5.random(0, colours.length))

        return colours[randomNum]
    }

    p5.setup = () => {
        p5.createCanvas(canvasWidth, canvasHeight)
        p5.colorMode("hsb", 100)
        p5.noStroke()
        p5.fill(0, 0, 30)
        p5.noLoop()
        // p5.background(getRandomColour())
    }

    p5.draw = () => {
        for (let x = 0; x < canvasWidth + radius * 2; x += radius * 2.75) {
            for (let y = 0; y < canvasHeight + radius * 2; y += radius * 2.75) {
                p5.fill(getRandomColour())
                p5.stroke(getRandomColour())
                p5.strokeWeight(Math.ceil(p5.random(0, 3)))
                drawShapes({ x, y, r: radius * 2, divisions: 8 })
            }
        }

        for (
            let x = (radius * 2.75) / 2;
            x < canvasWidth + radius * 2;
            x += radius * 2.75
        ) {
            for (
                let y = (radius * 2.75) / 2;
                y < canvasHeight + radius * 2;
                y += radius * 2.75
            ) {
                p5.fill(getRandomColour())
                p5.stroke(getRandomColour())
                p5.strokeWeight(Math.ceil(p5.random(0, 3)))
                drawShapes({ x, y, r: radius / 2, divisions: 4 })
            }
        }
    }

    const drawShapes = ({
        x,
        y,
        r,
        divisions,
    }: {
        x: number
        y: number
        r: number
        divisions: number
    }) => {
        // Guard condition: stop recursion when the radius is too small
        if (r < minRadius) return

        // Draw the current octagon
        if (p5.random() < 0.2) p5.fill(getRandomColour())
        if (p5.random() < 0.5) p5.stroke(getRandomColour())
        if (p5.random() < 0.2) p5.strokeWeight(Math.ceil(p5.random(0, 3)))

        for (let angle = 0; angle < p5.TWO_PI; angle += p5.TWO_PI / divisions) {
            const childX = p5.cos(angle) * r + x
            const childY = p5.sin(angle) * r + y

            // Draw a circle at each vertex of the octagon
            p5.circle(childX, childY, circleSize)

            // Recursively draw smaller octagons at each vertex
            drawShapes({ x: childX, y: childY, r: r * 0.25, divisions })
        }
    }

    p5.mouseClicked = () => {
        p5.remove()
    }

    p5.windowResized = () => {
        const newElement = document.querySelector("#sketch") as HTMLElement
        p5.resizeCanvas(newElement.clientWidth, newElement.clientHeight)
        // t = 0
        p5.draw()
    }
}

// try   drawShapes({ x, y, r: radius * 3 })
