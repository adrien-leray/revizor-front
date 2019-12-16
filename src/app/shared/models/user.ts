import * as uuid from 'uuid';

export class User {
    id: string = uuid.v4();
    name: string;
    mail: string;

    constructor(name: string, mail: string) {
        this.name = name;
        this.mail = mail;
    }
}