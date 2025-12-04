import p5 from "p5"
import { canvasWidth } from "@utils/globals"

type JuliaOptions = {
    width?: number
    aspectRatio?: number
    iterations?: number
    cx?: number
    cy?: number
    zoom?: number
    hue?: number
}

export const sketch = (p5: p5, options: JuliaOptions) => {
    const maxIterations = options.iterations ?? 400
    const cRe = options.cx ?? 0.285
    const cIm = options.cy ?? 0.01
    const zoom = options.zoom ?? 1
    const baseHue = options.hue ?? 200

    const aspectRatio = options.aspectRatio ?? 1
    const width = options.width || canvasWidth
    const height = Math.round(width * aspectRatio)

    p5.setup = () => {
        p5.createCanvas(width, height)
        p5.pixelDensity(1)
        p5.colorMode("hsb", 360, 100, 100, 1)
        p5.noLoop()
        p5.noStroke()
    }

    const renderJulia = () => {
        p5.loadPixels()
        const pixels = p5.pixels
        const scaleX = 3 / zoom
        const scaleY = (3 * height) / (zoom * width)

        let idx = 0
        for (let py = 0; py < height; py++) {
            const y0 = (py / height - 0.5) * scaleY
            for (let px = 0; px < width; px++) {
                const x0 = (px / width - 0.5) * scaleX
                let zx = x0
                let zy = y0
                let iter = 0
                let radiusSquared = 0

                while (iter < maxIterations) {
                    const xTemp = zx * zx - zy * zy + cRe
                    zy = 2 * zx * zy + cIm
                    zx = xTemp
                    radiusSquared = zx * zx + zy * zy
                    if (radiusSquared > 4) break
                    iter++
                }

                let r: number, g: number, b: number, a: number
                if (iter === maxIterations) {
                    const col = p5.color(baseHue, 0, 0, 1)
                    r = p5.red(col)
                    g = p5.green(col)
                    b = p5.blue(col)
                    a = 255
                } else {
                    const magnitude = Math.sqrt(radiusSquared)
                    const smooth =
                        iter + 1 - Math.log(Math.log(Math.max(2, magnitude))) / Math.log(2)
                    const t = smooth / maxIterations
                    const hueVal = (baseHue + 360 * t) % 360
                    const saturation = 90
                    const brightness = 100 * Math.pow(t, 0.65)
                    const col = p5.color(hueVal, saturation, brightness, 1)
                    r = p5.red(col)
                    g = p5.green(col)
                    b = p5.blue(col)
                    a = 255
                }

                pixels[idx++] = r
                pixels[idx++] = g
                pixels[idx++] = b
                pixels[idx++] = a
            }
        }
        p5.updatePixels()
    }

    p5.draw = () => {
        renderJulia()
    }

    const saveImage = () => {
        p5.save(
            "julia" +
                "-width" +
                width +
                "-iter" +
                maxIterations +
                "-cx" +
                cRe +
                "-cy" +
                cIm +
                "-zoom" +
                zoom +
                "-hue" +
                baseHue +
                ".png"
        )
    }

    p5.mouseClicked = () => {
        saveImage()
    }
}


