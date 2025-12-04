import p5 from "p5"
import { canvasWidth } from "@utils/globals"

type AuroraOptions = { scale: number; hue: number; width?: number; lines?: number }

export const sketch = (p5: p5, options: AuroraOptions) => {
    const { scale, hue } = options
    const randomSeed = 112358
    const noiseSeed = randomSeed * 1000

    const aspectRatio = 1.4
    const width = options.width || canvasWidth
    const height = width * aspectRatio

    p5.setup = () => {
        p5.createCanvas(width, height)
        p5.colorMode("hsb", 360, 100, 100, 1)
        p5.noFill()
        p5.noLoop()
    }

    const drawFlow = () => {
        p5.background(hue, 30, 10, 1)
        p5.translate(width / 2, height / 2)

        const linesCount = options.lines ?? 1400
        const fieldScale = 0.0015
        const stepLength = (width / 1000) * (30 / scale)
        const maxSteps = Math.ceil(120 + scale * 6)

        for (let i = 0; i < linesCount; i++) {
            const startRadius = p5.randomGaussian(0, width * 0.12)
            const startAngle = p5.random() * p5.TAU
            let x = p5.cos(startAngle) * startRadius
            let y = p5.sin(startAngle) * startRadius

            const baseHue = (hue + p5.randomGaussian(0, 20) + 360) % 360
            const saturation = Math.max(0, Math.min(100, 80 + p5.randomGaussian(0, 10)))
            let alpha = p5.randomGaussian(0.22, 0.08)
            alpha = Math.max(0.02, Math.min(0.4, alpha))
            const weight = p5.random(0.6, 1.8) * (scale / 12)

            p5.stroke(baseHue, saturation, 95, alpha)
            p5.strokeWeight(weight)

            p5.beginShape()
            p5.vertex(x, y)
            for (let s = 0; s < maxSteps; s++) {
                const angle =
                    p5.noise(
                        (x + width * 0.5) * fieldScale,
                        (y + height * 0.5) * fieldScale
                    ) *
                        p5.TAU *
                        2 -
                    p5.PI
                x += p5.cos(angle) * stepLength
                y += p5.sin(angle) * stepLength

                // minor drift for organic variation
                x += p5.randomGaussian(0, stepLength * 0.05)
                y += p5.randomGaussian(0, stepLength * 0.05)

                if (p5.abs(x) > width * 0.55 || p5.abs(y) > height * 0.55) break

                if (s % 8 === 0) {
                    const t = s / maxSteps
                    const hueStep = (baseHue + (1 - t) * 10 + t * 80 + 360) % 360
                    const a = Math.max(0.02, Math.min(0.35, alpha))
                    p5.stroke(hueStep, saturation, 100, a)
                }

                p5.vertex(x, y)
            }
            p5.endShape()
        }
    }

    p5.draw = () => {
        p5.randomSeed(randomSeed)
        p5.noiseSeed(noiseSeed)
        drawFlow()
    }

    const saveImage = () => {
        p5.save(
            "aurora" +
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
}


