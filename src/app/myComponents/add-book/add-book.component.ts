import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/Book';
import { Category } from 'src/app/Category';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  @Input() categories: Category[];
  title: string
  description: string
  price: number
  author: string
  category: string

  @Output() addBookEmitter:EventEmitter<Book> = new EventEmitter();

  constructor() {
  }
  async addBook() {
    const category_id = this.categories.find((elem)=>this.category==elem.name)?.category_id;
    if ( this.title && this.description && this.price && this.author && category_id )
    {
      const newBook: Book = {
        book_id: null,
        title: this.title,
        author: this.author,
        description: this.description,
        price: this.price,
        category_id: category_id
      }
      let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify(newBook);
       
       let response = await fetch("http://localhost:3000/insert/", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.text();
       console.log(data);
       this.addBookEmitter.emit(newBook);
       
       this.title = "";
       this.description = "";
       this.price = 0;
       this.category = "";
       this.author = "";
    }

  }

  ngOnInit(): void {
  }

}
