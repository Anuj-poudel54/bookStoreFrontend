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
  image: File

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
        category_id: category_id,
      }

      const formData = new FormData();
      formData.append('book', JSON.stringify(newBook));
      formData.append('image', this.image);

      let headers = {
        "Accept": "*/*",
       }
       
       let response = await fetch("http://localhost:3000/insert/", { 
         method: "POST",
         body: formData,
         headers: headers
       });
       
       let data = await response.text();
       console.log(data);
       this.addBookEmitter.emit(newBook);
       
       const form: HTMLFormElement | null = document.querySelector("#add-form");
       form?.reset();
    }

  }

  onFileSelected(event: Event){

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length) {
        this.image = input.files[0];
        console.log("File selected");
        console.log(this.image);
      }
      console.log("File not selected");
  }

  ngOnInit(): void {
  }

}
