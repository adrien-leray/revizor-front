import * as uuid from 'uuid';

export class CourseSheet {

    id: string = uuid.v4();
    name: string;
    image: string;
    category: string;
    author: string;
    postDate: Date;
    updateDate: Date;
    price: number;

    constructor(name: string, image: string, category: string, author: string, postDate: Date, updateDate: Date, price: number) {
        this.name = name;
        this.image = image;
        this.category = category;
        this.author = author;
        this.postDate = postDate;
        this.updateDate = updateDate;
        this.price = price;
    }
}