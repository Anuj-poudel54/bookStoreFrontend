import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/Book';
import { Category } from 'src/app/Category';
import { SenderService } from 'src/app/sender.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  books: Book[];
  categories: Category[];
  book_id: string | null;
  title: string | undefined
  description: string | undefined
  price: number | undefined
  author: string | undefined
  category: string | undefined
  bookToUpdate: Book | undefined;
  constructor(private _ActivatedRoute: ActivatedRoute, private bookSender: SenderService, private renderer: Renderer2) {
    this.book_id = this._ActivatedRoute.snapshot.paramMap.get("book_id");
    this.books = this.bookSender.books;
    this.categories = this.bookSender.categories;
    this.bookToUpdate = this.books.find((book) => book.book_id == this.book_id)
    const categoryName = this.categories.find((cat) => cat.category_id === this.bookToUpdate?.category_id)?.name;

    this.title = this.bookToUpdate?.title;
    this.description = this.bookToUpdate?.description;
    this.price = this.bookToUpdate?.price;
    this.category = categoryName;
    this.author = this.bookToUpdate?.author;
  }

  ngOnInit(): void {
  }

  async updateBook() {
    const book = {
      author: this.author,
      title: this.title,
      description: this.description,
      price: this.price,
      category_id: this.categories.find((cat) => cat.name === this.category)?.category_id
    }
    if (book.author && book.price && book.description && book.title && book.category_id && book != this.bookToUpdate) {
      let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
      }

      let bodyContent = JSON.stringify(book);

      let response = await fetch("http://localhost:3000/update/" + this.book_id, {
        method: "PUT",
        body: bodyContent,
        headers: headersList
      });
      const msg = document.getElementById("msg");
      this.renderer.setStyle(msg, 'transform', 'translateY(0)');
      setTimeout(() => {
        this.renderer.setStyle(msg, 'transform', 'translateY(-57px)');
      }, 2000);
    }
  }

}
