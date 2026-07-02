export class Editor2D {

    constructor(canvas, model) {

        this.model = model;

        this.stage = new Konva.Stage({

            container: canvas.parentElement,
            width: canvas.parentElement.clientWidth,
            height: canvas.parentElement.clientHeight

        });

        this.layer = new Konva.Layer();

        this.stage.add(this.layer);

    }

    draw() {

        this.layer.destroyChildren();

        this.model.getAll().forEach(object => {

            const rect = new Konva.Rect({

                x: object.x * 40,

                y: object.y * 40,

                width: object.width * 40,

                height: object.depth * 40,

                fill: object.floor == 1
                    ? "rgba(80,120,255,0.4)"
                    : "rgba(180,180,180,0.5)",

                stroke: "black",

                draggable: true

            });

            rect.on("dragend", () => {

                object.x = rect.x() / 40;
                object.y = rect.y() / 40;

            });

            this.layer.add(rect);

        });

        this.layer.draw();

    }

}