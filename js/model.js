export class Model {

    constructor() {

        this.objects = [];

    }

    load(data) {

        this.objects = data;

    }

    getAll() {

        return this.objects;

    }

    add(object) {

        this.objects.push(object);

    }

}