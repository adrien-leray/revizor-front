import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as uuid from 'uuid';

import { Author } from './author';

export class CourseSheet {

    id: string = uuid.v4();
    name: string;
    image: string;
    category: any;
    author: any;
    postDate: Date = new Date();
    updateDate: Date = new Date();
    downloadDate: Date = new Date();
    price: number;

    constructor(name?: string, image?: string, category?: string, author?: string, price?: number) {
        this.name = name;
        this.image = image;
        this.category = category;
        this.author = author;
        this.price = price;
    }

    static toModel(dto: any): CourseSheet {
        const model = new CourseSheet();
        model.name = dto.name;
        model.image = environment.apiUrl + dto.image;
        model.category = dto.category;
        model.author = dto.author;
        model.postDate = new Date(dto.publication_date);
        model.updateDate = new Date(dto.updated_date);
        model.price = dto.price;
        return model;
    }

    toDto(): any {
        return {
            name: this.name,
            category: this.category,
            author: this.author,
            publication_date: this.postDate,
            updateDate: this.updateDate,
            price: this.price,
            image: this.image
        }
    }
}