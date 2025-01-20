import p5 from "p5"
import { canvasWidth, canvasHeight } from "@utils/globals"

type Circle = { x: number; y: number; d: number }
type Shapes = { color: p5.Color; count: number; circles: Circle[] }[]

export const sketch = (p5: p5) => {
    const num = 1000
    const randomSeed = 7302
    const noiseSeed = randomSeed * 1000
    const shapes: Shapes = []
    let scale = 10
    let ratio = 2

    p5.setup = () => {
        p5.createCanvas(canvasWidth, canvasHeight)
        p5.colorMode("hsb", 360, 100, 100, 1)
        p5.noStroke()
        p5.noLoop()
    }

    const createCircles = ({
        ratio,
        scale,
    }: {
        ratio: number
        scale: number
    }) => {
        for (let i = 1; i < num; i += i / 2 + 1) {
            const circles = []
            const color = p5.color(
                p5.random() * 360,
                100,
                100,
                p5.randomGaussian(0.5, 0)
                // p5.randomGaussian(0.4, 0.3)
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
    }

    const drawSketch = ({
        ratio,
        scale,
        backgroundIndex,
    }: {
        ratio: number
        scale: number
        backgroundIndex: number
    }) => {
        scale = scale
        ratio = ratio

        p5.background(
            p5.random() * 360,
            p5.randomGaussian(0.75) * 100,
            p5.randomGaussian(1) * 100,
            1
        )

        createCircles({ ratio, scale })
        console.log(shapes[13].color)

        p5.translate(canvasWidth / 2, canvasHeight / 2)
        p5.background(shapes[backgroundIndex].color)

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
        // drawSketch({ ratio: 2, scale: 10, backgroundIndex: 9 }) // big
        // drawSketch({ ratio: 2, scale: 20, backgroundIndex: 14 }) // medium
        drawSketch({ ratio: 2, scale: 40, backgroundIndex: 13 }) // small
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
