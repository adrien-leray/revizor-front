import * as uuid from 'uuid';

export class Transaction {
    id: string = uuid.v4();
    fiche: number;

    constructor(fiche: number) {
        this.fiche = fiche;
    }
}