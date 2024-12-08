import p5 from "p5"
import { canvasWidth, canvasHeight } from "@utils/globals"

export const sketch = (p5: p5) => {
    let t = 0
    const radius = canvasWidth / 25
    const circleSize = radius / 5

    const getRandomColour = () => {
        const colours = [
            p5.color(5, 100, 100),
            p5.color(66, 100, 100),
            p5.color(100, 100, 100),
            p5.color(16, 100, 100),
        ]

        const randomNum = Math.ceil(p5.random(0, colours.length - 1))

        return colours[randomNum]
    }

    p5.setup = () => {
        p5.createCanvas(canvasWidth, canvasHeight)
        p5.colorMode("hsb", 100)
        p5.noStroke()
        p5.fill(0, 0, 30)
        p5.noLoop()
    }

    p5.draw = () => {
        for (let x = 0; x < canvasWidth + radius * 2; x += radius * 2.75) {
            for (let y = 0; y < canvasHeight + radius * 2; y += radius * 2.75) {
                p5.fill(getRandomColour())
                p5.stroke(getRandomColour())
                p5.strokeWeight(Math.ceil(p5.random(0, 3)))
                drawOctagons({ x, y, r: radius })
            }
        }
    }

    const drawOctagons = ({ x, y, r }: { x: number; y: number; r: number }) => {
        // Guard condition: stop recursion when the radius is too small
        if (r < 5) return

        // Draw the current octagon
        if (p5.random() < 0.2) p5.fill(getRandomColour())
        if (p5.random() < 0.5) p5.stroke(getRandomColour())
        if (p5.random() < 0.2) p5.strokeWeight(Math.ceil(p5.random(0, 3)))

        for (let angle = 0; angle < p5.TWO_PI; angle += p5.TWO_PI / 8) {
            const childX = p5.cos(angle) * r + x
            const childY = p5.sin(angle) * r + y

            // Draw a circle at each vertex of the octagon
            p5.circle(childX, childY, circleSize)

            // Recursively draw smaller octagons at each vertex
            drawOctagons({ x: childX, y: childY, r: r * 0.25 })
        }
    }

    p5.mouseClicked = () => {
        p5.remove()
    }

    p5.windowResized = () => {
        const newElement = document.querySelector("#sketch") as HTMLElement
        p5.resizeCanvas(newElement.clientWidth, newElement.clientHeight)
        t = 0
        p5.draw()
    }
}

// try   drawOctagons({ x, y, r: radius * 3 })
