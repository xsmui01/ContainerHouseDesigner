import { Model } from "./js/model.js";
import { Editor2D } from "./js/editor2d.js";

const model = new Model();

const editor = new Editor2D(

    document.getElementById("canvas"),
    model

);

editor.draw();