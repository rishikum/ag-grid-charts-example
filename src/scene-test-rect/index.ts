import {Scene} from "ag-grid-enterprise/src/charts/scene/scene";
import {Group} from "ag-grid-enterprise/src/charts/scene/group";
import {Rect} from "ag-grid-enterprise/src/charts/scene/shape/rect";
import {FpsCounter} from "ag-grid-enterprise/src/charts/scene/fpsCounter";

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene(document.body, 800, 400);
    const group = new Group();

    const n = 1000;
    const width = scene.width;
    const height = scene.height;

    const rects: Rect[] = [];
    const deltas: [number, number][] = [];
    for (let i = 0; i < n; i++) {
        const rect = new Rect();
        rect.x = Math.random() * width;
        rect.y = Math.random() * height;
        rect.width = 10;
        rect.height = 10;
        rects.push(rect);

        deltas.push([Math.random() - 0.5, Math.random() - 0.5]);
    }
    group.addAll(rects);

    scene.root = group;

    const fpsCounter = new FpsCounter(document.body);

    (function step() {
        fpsCounter.countFrame();

        rects.forEach((rect, i) => {
            const delta = deltas[i];

            rect.x += delta[0];
            rect.y += delta[1];

            if (rect.x > width) {
                rect.x -= width;
            }
            else if (rect.x < 0) {
                rect.x += width;
            }

            if (rect.y > height) {
                rect.y -= height;
            }
            else if (rect.y < 0) {
                rect.y += height;
            }
        });

        requestAnimationFrame(step);
    })();
});
