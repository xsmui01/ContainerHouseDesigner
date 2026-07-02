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

    getById(id) {
        return this.objects.find(o => o.id === id);
    }

}