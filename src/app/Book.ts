export class Book {
    book_id: number | null
    title: string
    author: string
    description: string
    price: number
    category_id: number
}

export interface LocalCart{
    name: string,
    count: number,
}

