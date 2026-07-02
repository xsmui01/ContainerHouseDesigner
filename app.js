import { Model } from "./js/model.js";
import { Editor2D } from "./js/editor2d.js";

const model = new Model();

const editor = new Editor2D("canvas", model);

document
    .getElementById("btnImport")
    .addEventListener("click", () => {

        document
            .getElementById("fileInput")
            .click();

    });

document
    .getElementById("fileInput")
    .addEventListener("change", event => {

        const file = event.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = e => {

            const data = JSON.parse(e.target.result);

            data.forEach(o => {

                if (o.width === undefined) o.width = o.w;
                if (o.depth === undefined) o.depth = o.h;
                if (o.height === undefined) o.height = o.v;

                if (o.floor === undefined)
                    o.floor = o.z + 1;

            });

            model.load(data);

            editor.draw();

        };

        reader.readAsText(file);

    });