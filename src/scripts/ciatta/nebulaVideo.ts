import p5 from "p5"
import { canvasWidth } from "@utils/globals"

type Circle = { x: number; y: number; d: number }
type Shape = { color: p5.Color; count: number; circles: Circle[] }

export const sketch = (
    p5: p5,
    options: {
        // Back-compat single values
        scale?: number
        hue?: number
        // Animated params
        scaleStart?: number
        scaleEnd?: number
        hueStart?: number
        hueEnd?: number
        frames?: number
        width?: number
    }
) => {
    // Defaults aligned with user's examples
    const scaleStart = options.scaleStart ?? options.scale ?? 30
    const scaleEnd = options.scaleEnd ?? options.scale ?? 10
    const hueStart = options.hueStart ?? options.hue ?? 35
    const hueEnd = options.hueEnd ?? options.hue ?? 15
    const totalFrames = Math.max(2, options.frames ?? 180)
    const ratio1 = 2
    const ratio2 = 1 / 675
    const num = 1000
    const randomSeed = 7302
    const noiseSeed = randomSeed * 1000

    const aspectRatio = 1.4
    const width = options.width || canvasWidth
    const height = width * aspectRatio

    let frameIndex = 0

    p5.setup = () => {
        p5.createCanvas(width, height)
        p5.colorMode("hsb", 360, 100, 100, 1)
        p5.noStroke()
    }

    const createCircles = (currentScale: number) => {
        const shapes: Shape[] = []

        for (let i = 1; i < num; i += i / 2 + 1) {
            const circles = []
            const color = p5.color(
                p5.random() * 360,
                100,
                100,
                p5.randomGaussian(0.4, 0.25)
            )

            let count = 0
            for (let j = 0; j < 2 * p5.PI; j += p5.PI / (p5.noise(i) * 36)) {
                const x = p5.cos(j) * p5.noise(i) * i * width * ratio1 * ratio2
                const y = p5.sin(j) * p5.noise(j) * i * width * ratio1 * ratio2
                const d = ((p5.randomGaussian(0) * width) / currentScale) * ratio1
                circles.push({ x, y, d })
                count++
            }
            shapes.push({ circles, color, count })
        }

        return shapes
    }

    const drawSketch = (currentHue: number, currentScale: number) => {
        let backgroundColor = p5.color(
            p5.random() * 360,
            p5.randomGaussian(1) * 100,
            p5.randomGaussian(1) * 100,
            1
        )

        p5.background(backgroundColor)

        const shapes = createCircles(currentScale)

        p5.translate(width / 2, height / 2)
        backgroundColor = p5.color(currentHue, 100, 100, 1)
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

    p5.draw = () => {
        p5.randomSeed(randomSeed)
        p5.noiseSeed(noiseSeed)
        const t =
            totalFrames <= 1
                ? 1
                : Math.min(1, Math.max(0, frameIndex / (totalFrames - 1)))
        const currentScale = p5.lerp(scaleStart, scaleEnd, t)
        const currentHue = p5.lerp(hueStart, hueEnd, t)
        drawSketch(currentHue, currentScale)
        // paper()
        // saveImage()
        frameIndex++
        if (frameIndex >= totalFrames) {
            p5.noLoop()
        }
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
