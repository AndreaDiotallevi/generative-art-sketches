import p5 from "p5"
import { canvasWidth } from "@utils/globals"

type Circle = { x: number; y: number; d: number }
type Shape = { color: p5.Color; count: number; circles: Circle[] }

export const sketch = (
    p5: p5,
    options: { scale: number; hue: number; width?: number }
) => {
    const { scale, hue } = options
    const ratio1 = 2
    const ratio2 = 1 / 675
    const num = 1000
    const randomSeed = 7302
    const noiseSeed = randomSeed * 1000

    const aspectRatio = 1.4
    const width = options.width || canvasWidth
    const height = width * aspectRatio

    p5.setup = () => {
        p5.createCanvas(width, height)
        p5.colorMode("hsb", 360, 100, 100, 1)
        p5.noStroke()
        p5.noLoop()
    }

    const createCircles = () => {
        const shapes: Shape[] = []

        for (let i = 1; i < num; i += i / 2 + 1) {
            const circles = []
            const color = p5.color(
                p5.random() * 360,
                100,
                100,
                // p5.randomGaussian(0.5, 0)
                // p5.randomGaussian(0.55, 0.05)
                p5.randomGaussian(0.4, 0.25)
                // p5.randomGaussian(0.5, 0.3)
            )

            let count = 0
            for (let j = 0; j < 2 * p5.PI; j += p5.PI / (p5.noise(i) * 36)) {
                const x = p5.cos(j) * p5.noise(i) * i * width * ratio1 * ratio2
                const y = p5.sin(j) * p5.noise(j) * i * width * ratio1 * ratio2
                const d = ((p5.randomGaussian(0) * width) / scale) * ratio1
                circles.push({ x, y, d })
                count++
            }
            shapes.push({ circles, color, count })
        }

        return shapes
    }

    const drawSketch = () => {
        let backgroundColor = p5.color(
            p5.random() * 360,
            p5.randomGaussian(1) * 100,
            p5.randomGaussian(1) * 100,
            1
        )

        p5.background(backgroundColor)

        const shapes = createCircles()

        p5.translate(width / 2, height / 2)
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
    //     const step = width / 400
    //     for (let x = 0; x < width; x += step) {
    //         for (let y = 0; y < height; y += step) {
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
        drawSketch()
        // paper()
        // saveImage()
    }

    const saveImage = () => {
        p5.save(
            "nebula" +
                "-width" +
                width +
                "-rSeed" +
                randomSeed +
                "-nSeed" +
                noiseSeed +
                "-scale" +
                scale +
                "-hue" +
                hue +
                ".png"
        )
    }

    p5.mouseClicked = () => {
        saveImage()
    }

    // p5.windowResized = () => {
    //     const newElement = document.querySelector("#sketch") as HTMLElement
    //     p5.resizeCanvas(newElement.clientWidth, newElement.clientHeight)
    //     p5.draw()
    // }
}

// http://localhost:4321/ciatta?scale=30&hue=35&width=2000
// http://localhost:4321/ciatta?scale=20&hue=25&width=2000
// http://localhost:4321/ciatta?scale=10&hue=15&width=2000

// 5906 x 8268 50x70 (500x700) 300 DPI
// 2481 x 3508 A4 (210x297)
