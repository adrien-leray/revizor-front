import * as uuid from 'uuid';

export class Author {
    id: string = uuid.v4();
    firstname: string;
    lastname: string;
    user: string;

    constructor(firstname?: string, lastname?: string, user?: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.user = user;
    }
}
