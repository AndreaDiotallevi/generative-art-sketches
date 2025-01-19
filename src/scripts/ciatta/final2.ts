import p5 from "p5"
import { canvasWidth, canvasHeight } from "@utils/globals"

type Circle = { x: number; y: number; d: number }
type Shapes = { color: p5.Color; count: number; circles: Circle[] }[]
type Elements = { shapes: Shapes; background: p5.Color }

// big - backgroun 9
// medium - normal
// small -

export const sketch = (p5: p5) => {
    const ratio = 2
    let randomSeed: number
    let noiseSeed: number
    const scale = 10
    const num = 1000
    const shapes: Shapes = []
    let elements: Elements

    p5.setup = () => {
        p5.createCanvas(canvasWidth, canvasHeight)
        p5.colorMode("hsb", 360, 100, 100, 1)
        p5.noStroke()
        p5.noLoop()
    }

    const createCircles = () => {
        for (let i = 1; i < num; i += i / 2 + 1) {
            const circles = []
            const color = p5.color(
                p5.random() * 360,
                100,
                100,
                p5.randomGaussian(0.4, 0.3)
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

    const drawSketch = () => {
        const backgroundColor = p5.color(
            p5.random() * 360,
            p5.randomGaussian(0.75) * 100,
            p5.randomGaussian(1) * 100,
            1
        )
        p5.background(backgroundColor)

        createCircles()
        console.log(shapes)
        elements = { shapes, background: backgroundColor }
        p5.translate(canvasWidth / 2, canvasHeight / 2)
        // const newRandom = Math.floor(p5.random(1000))
        const newRandom = 26
        console.log(newRandom)
        p5.randomSeed(newRandom)
        p5.background(shapes[9].color) // big
        // p5.background(shapes[14].color) // medium
        // p5.background(shapes[13].color) // small

        for (let i = 0; i < shapes.length; i++) {
            const group = shapes[i]
            // const nextGroup = shapes[(i + 14) % shapes.length]
            p5.fill(group.color)
            // p5.fill(shapes[Math.floor(p5.random() * shapes.length)].color)
            for (let j = 0; j < group.circles.length; j++) {
                const circle = group.circles[j]
                p5.circle(circle.x, circle.y, circle.d)
            }
        }
    }

    const paper = () => {
        const step = canvasWidth / 400
        for (let x = 0; x < canvasWidth; x += step) {
            for (let y = 0; y < canvasHeight; y += step) {
                p5.push()
                p5.fill(p5.random(255), 100, 100, 0.015)
                p5.rect(x, y, step, step)
                p5.pop()
            }
        }
    }

    p5.draw = () => {
        randomSeed = 7302
        noiseSeed = randomSeed * 1000
        p5.randomSeed(randomSeed)
        p5.noiseSeed(noiseSeed)
        drawSketch()
        paper()
    }

    // p5.mouseClicked = () => {
    //     p5.save(
    //         canvasWidth +
    //             "-galassia-rSeed=" +
    //             randomSeed +
    //             "-nSeed=" +
    //             noiseSeed +
    //             "-scale=" +
    //             scale +
    //             "-ratio=" +
    //             ratio +
    //             ".png"
    //     )
    // }

    p5.windowResized = () => {
        const newElement = document.querySelector("#sketch") as HTMLElement
        p5.resizeCanvas(newElement.clientWidth, newElement.clientHeight)
        p5.draw()
    }
}
