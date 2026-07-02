const SCALE = 40;

export class Editor2D {

    constructor(containerId, model) {

        this.model = model;

        const container = document.getElementById(containerId);

        this.stage = new Konva.Stage({
            container: containerId,
            width: container.clientWidth,
            height: container.clientHeight
        });

        this.gridLayer = new Konva.Layer();
        this.objectLayer = new Konva.Layer();

        this.stage.add(this.gridLayer);
        this.stage.add(this.objectLayer);

        this.drawGrid();
    }

    drawGrid() {

        const w = this.stage.width();
        const h = this.stage.height();

        for (let x = 0; x <= w; x += SCALE) {

            this.gridLayer.add(new Konva.Line({
                points: [x, 0, x, h],
                stroke: "#dddddd",
                strokeWidth: 1
            }));

        }

        for (let y = 0; y <= h; y += SCALE) {

            this.gridLayer.add(new Konva.Line({
                points: [0, y, w, y],
                stroke: "#dddddd",
                strokeWidth: 1
            }));

        }

        this.gridLayer.draw();

    }

    draw() {

        this.objectLayer.destroyChildren();

        this.model.getAll().forEach(obj => {

            const color = obj.floor === 2
                ? "#99bbff"
                : "#d0d0d0";

            const group = new Konva.Group({

                x: obj.x * SCALE,
                y: obj.y * SCALE,
                draggable: true

            });

            const rect = new Konva.Rect({

                width: obj.width * SCALE,
                height: obj.depth * SCALE,

                fill: color,

                stroke: "black",
                strokeWidth: 2

            });

            const text = new Konva.Text({

                text: obj.id,

                width: obj.width * SCALE,

                height: obj.depth * SCALE,

                align: "center",

                verticalAlign: "middle",

                fontSize: 18

            });

            group.add(rect);
            group.add(text);

            group.on("dragend", () => {

                obj.x = Math.round(group.x() / SCALE * 2) / 2;
                obj.y = Math.round(group.y() / SCALE * 2) / 2;

            });

            group.on("click", () => {

                document.getElementById("id").value = obj.id;
                document.getElementById("x").value = obj.x;
                document.getElementById("y").value = obj.y;
                document.getElementById("width").value = obj.width;
                document.getElementById("depth").value = obj.depth;
                document.getElementById("height").value = obj.height;

            });

            this.objectLayer.add(group);

        });

        this.objectLayer.draw();

    }

}