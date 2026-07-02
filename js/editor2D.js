const SCALE = 40;

export class Editor2D {

    constructor(containerId, model) {

        this.model = model;

        const div = document.getElementById(containerId);

        this.stage = new Konva.Stage({

            container: containerId,

            width: div.clientWidth,

            height: div.clientHeight

        });

        this.gridLayer = new Konva.Layer();
        this.objectLayer = new Konva.Layer();

        this.stage.add(this.gridLayer);
        this.stage.add(this.objectLayer);

        this.drawGrid();

    }

    drawGrid() {

        this.gridLayer.destroyChildren();

        for (let x = 0; x < this.stage.width(); x += SCALE) {

            this.gridLayer.add(

                new Konva.Line({

                    points: [x,0,x,this.stage.height()],

                    stroke:"#dddddd"

                })

            );

        }

        for (let y = 0; y < this.stage.height(); y += SCALE) {

            this.gridLayer.add(

                new Konva.Line({

                    points:[0,y,this.stage.width(),y],

                    stroke:"#dddddd"

                })

            );

        }

        this.gridLayer.draw();

    }

    draw() {

        this.objectLayer.destroyChildren();

        this.model.getAll().forEach(obj => {

            const g = new Konva.Group({

                x: obj.x * SCALE,

                y: obj.y * SCALE,

                draggable:true

            });

            g.add(

                new Konva.Rect({

                    width: obj.width * SCALE,

                    height: obj.depth * SCALE,

                    fill: obj.floor==2
                        ? "#9ec5ff"
                        : "#d8d8d8",

                    stroke:"black",

                    strokeWidth:2

                })

            );

            g.add(

                new Konva.Text({

                    width: obj.width*SCALE,

                    height: obj.depth*SCALE,

                    text: obj.id,

                    align:"center",

                    verticalAlign:"middle",

                    fontSize:18

                })

            );

            g.on("dragend",()=>{

                obj.x=Math.round(g.x()/20)/2;
                obj.y=Math.round(g.y()/20)/2;

            });

            this.objectLayer.add(g);

        });

        this.objectLayer.draw();

    }

}