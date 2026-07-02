import { Model } from "./js/model.js";
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