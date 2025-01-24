import p5 from "p5"
import { canvasWidth, canvasHeight } from "@utils/globals"

type Circle = { x: number; y: number; d: number }
type Shapes = { color: p5.Color; count: number; circles: Circle[] }[]

export const sketch = (p5: p5, options: { scale: number; hue: number }) => {
    const num = 1000
    const randomSeed = 7302
    const noiseSeed = randomSeed * 1000
    const shapes: Shapes = []
    const { scale, hue } = options
    const ratio = 2

    p5.setup = () => {
        p5.createCanvas(canvasWidth, canvasHeight)
        p5.colorMode("hsb", 360, 100, 100, 1)
        p5.noStroke()
        p5.noLoop()
    }

    const createCircles = ({ ratio }: { ratio: number }) => {
        for (let i = 1; i < num; i += i / 2 + 1) {
            const circles = []
            const color = p5.color(
                p5.random() * 360,
                100,
                100,
                // p5.randomGaussian(0.5, 0)
                // p5.randomGaussian(0.55, 0.05)
                p5.randomGaussian(0.4, 0.3)
                // p5.randomGaussian(0.5, 0.3)
            )

            let count = 0
            for (let j = 0; j < 2 * p5.PI; j += p5.PI / (p5.noise(i) * 36)) {
                const x = p5.cos(j) * p5.noise(i) * i * ratio
                const y = p5.sin(j) * p5.noise(j) * i * ratio
                const d = ((p5.randomGaussian(0) * canvasWidth) / scale) * ratio
                circles.push({ x, y, d })
                count++
            }
            shapes.push({ circles, color, count })
        }
        shapes[13].color = p5.color(35, 100, 100, 0.5)
    }

    const drawSketch = () => {
        let backgroundColor = p5.color(
            p5.random() * 360,
            p5.randomGaussian(1) * 100,
            p5.randomGaussian(1) * 100,
            1
        )

        p5.background(backgroundColor)

        createCircles({ ratio })

        p5.translate(canvasWidth / 2, canvasHeight / 2)
        backgroundColor = p5.color(hue, 100, 100, 1)
        p5.background(backgroundColor)

        for (let i = 0; i < shapes.length; i++) {
            const group = shapes[i]
            p5.fill(group.color)
            for (let j = 0; j < group.circles.length; j++) {
                const circle = group.circles[j]
                p5.circle(circle.x, circle.y, circle.d)
            }
        }
    }

    // const paper = () => {
    //     const step = canvasWidth / 400
    //     for (let x = 0; x < canvasWidth; x += step) {
    //         for (let y = 0; y < canvasHeight; y += step) {
    //             p5.push()
    //             p5.fill(p5.random(255), 100, 100, 0.015)
    //             p5.rect(x, y, step, step)
    //             p5.pop()
    //         }
    //     }
    // }

    p5.draw = () => {
        p5.randomSeed(randomSeed)
        p5.noiseSeed(noiseSeed)
        // drawSketch({ ratio: 1.5 }) // big 9
        // drawSketch({ ratio: 2 }) // big 9 hue=15
        drawSketch() // medium 6 hue=27.5
        // drawSketch({ ratio: 2}) // small 13 hue=40
        // paper()
    }

    p5.mouseClicked = () => {
        p5.save(
            canvasWidth +
                "-nebula-rSeed=" +
                randomSeed +
                "-nSeed=" +
                noiseSeed +
                "-scale=" +
                scale +
                "-ratio=" +
                ratio +
                ".png"
        )
    }

    p5.windowResized = () => {
        const newElement = document.querySelector("#sketch") as HTMLElement
        p5.resizeCanvas(newElement.clientWidth, newElement.clientHeight)
        p5.draw()
    }
}

// http://localhost:4321/ciatta?scale=30&hue=35
// http://localhost:4321/ciatta?scale=20&hue=25
// http://localhost:4321/ciatta?scale=10&hue=330
