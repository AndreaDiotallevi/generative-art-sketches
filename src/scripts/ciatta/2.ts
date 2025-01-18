import p5 from "p5"
import { canvasWidth, canvasHeight } from "@utils/globals"

export const sketch = (p5: p5) => {
    let t = 0
    let circles: { x: number; y: number; r: number }[] = []

    p5.setup = () => {
        p5.createCanvas(canvasWidth, canvasHeight)
        p5.colorMode("hsb", 100)
        p5.noStroke()
        p5.fill(0, 0, 30)
        p5.background(0, 0, 70)
        p5.noLoop()
    }

    p5.draw = () => {
        for (let i = 0; i < 40; i++) {
            let newCircle = {
                x: p5.random(canvasWidth),
                y: p5.random(canvasHeight),
                r: p5.min(p5.random(canvasWidth) / 8, 200),
            }

            let attempts = 0
            while (intersects(newCircle) && attempts < 100) {
                newCircle.x = p5.random(canvasWidth)
                newCircle.y = p5.random(canvasHeight)
                attempts++
            }

            if (!intersects(newCircle)) {
                circles.push(newCircle)
                p5.circle(newCircle.x, newCircle.y, newCircle.r * 2)
            }
        }
    }

    function intersects(newCircle: {
        x: number
        y: number
        r: number
    }): boolean {
        for (let circle of circles) {
            let d = p5.dist(newCircle.x, newCircle.y, circle.x, circle.y)
            if (d < newCircle.r + circle.r) {
                return true
            }
        }
        return false
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
