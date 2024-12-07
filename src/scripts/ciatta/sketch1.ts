import p5 from "p5"
import { canvasWidth, canvasHeight } from "@utils/globals"

export const sketch = (p5: p5) => {
    let t = 0

    p5.setup = () => {
        p5.createCanvas(canvasWidth, canvasHeight)
        p5.stroke(255, 200, 22)
        p5.noFill()
    }

    p5.draw = () => {
        // if (t > 0) {
        //   p5.translate(p5.width / 2, p5.height / 2);
        //   const n = p5.noise;
        //   const a = 0.5 * p5.min(p5.width, p5.height);
        //   let b = n(t) * 6;
        //   let c = n(t + 60) * 6;
        //   p5.line(p5.cos(b) * a, p5.sin(b) * a, p5.cos(c) * a, p5.sin(c) * a);
        // }
        // t++;
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
