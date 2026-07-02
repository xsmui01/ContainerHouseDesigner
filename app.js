import { Model } from "./js/model.js";
import { Editor2D } from "./js/editor2d.js";

const model = new Model();

fetch("./data/demo.json")
    .then(r => r.json())
    .then(data => {

        // převod starého formátu

        data.forEach(o => {

            if (o.floor === undefined) {

                o.floor = o.z + 1;

            }

            if (o.width === undefined) {

                o.width = o.w;

            }

            if (o.depth === undefined) {

                o.depth = o.h;

            }

            if (o.height === undefined) {

                o.height = o.v;

            }

        });

        model.load(data);

        const editor = new Editor2D("canvas", model);

        editor.draw();

    });import { Model } from "./js/model.js";
import { Editor2D } from "./js/editor2d.js";

const model = new Model();

fetch("./data/demo.json")
    .then(r => r.json())
    .then(data => {

        model.load(data);

        const editor = new Editor2D(

            document.getElementById("canvas"),

            model

        );

        editor.draw();

    });