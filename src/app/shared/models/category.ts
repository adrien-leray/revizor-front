import * as uuid from 'uuid';

export class Category {
    id: string = uuid.v4();
    name: string;

    constructor(name?: string) {
        this.name = name;
    }
}
