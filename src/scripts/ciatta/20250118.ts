import p5 from "p5"
import { canvasWidth, canvasHeight } from "@utils/globals"

export const sketch = (p5: p5) => {
    const ratio = 1
    let randomSeed: number
    let noiseSeed: number

    p5.setup = () => {
        p5.createCanvas(canvasWidth, canvasHeight)
        p5.colorMode("hsb", 360, 100, 100, 1)
        p5.noStroke()
        p5.noLoop()
    }

    const drawSketch = () => {
        p5.push()
        p5.background(
            p5.random() * 360,
            p5.randomGaussian(0.75) * 100,
            p5.randomGaussian(1) * 100,
            1
        )
        // p5.background(0, 50, 100, 1)
        p5.translate(canvasWidth / 2, canvasHeight / 2)

        for (let i = 1; i < 3000; i += i / 2 + 1) {
            p5.fill(p5.random() * 360, 100, 100, p5.randomGaussian(0.4, 0.3))

            for (let j = 0; j < 2 * p5.PI; j += p5.PI / (p5.noise(i) * 36)) {
                const x = p5.cos(j) * p5.noise(i) * i * ratio
                const y = p5.sin(j) * p5.noise(j) * i * ratio
                p5.circle(x, y, p5.randomGaussian() * 40 * ratio)
            }
        }
        p5.pop()
    }

    p5.draw = () => {
        randomSeed = Math.ceil(p5.random(10000))
        // randomSeed = 19
        noiseSeed = randomSeed * 1000
        p5.randomSeed(randomSeed)
        p5.noiseSeed(noiseSeed)
        drawSketch()
        // p5.text("Random seed = " + randomSeed, 20, 20)
        // p5.text("Noise seed = " + noiseSeed, 20, 40)
        console.log(randomSeed, noiseSeed)
    }

    // p5.draw = () => {
    //     for (let i = 0; i < 20; i++) {
    //         randomSeed = i
    //         noiseSeed = i * 1000
    //         p5.randomSeed(randomSeed)
    //         p5.noiseSeed(noiseSeed)
    //         drawSketch()
    //         console.log(randomSeed, noiseSeed)
    //         // p5.save(
    //         //     canvasWidth +
    //         //         "-galassia-rSeed=" +
    //         //         randomSeed +
    //         //         "-nSeed=" +
    //         //         noiseSeed +
    //         //         ".png"
    //         // )
    //     }
    // }

    p5.mouseClicked = () => {
        // p5.remove()
        p5.save(
            canvasWidth +
                "-galassia-rSeed=" +
                randomSeed +
                "-nSeed=" +
                noiseSeed +
                ".png"
        )
    }

    p5.windowResized = () => {
        const newElement = document.querySelector("#sketch") as HTMLElement
        p5.resizeCanvas(newElement.clientWidth, newElement.clientHeight)
        p5.draw()
    }
}
