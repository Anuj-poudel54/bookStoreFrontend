import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/Book';
import { Category } from 'src/app/Category';
import { SenderService } from 'src/app/sender.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent {
  books: Book[];
  categories: Category[];
  router: Router;
  filterByCategory: number = 0;
  categoryIdSelector: number;
  adminMode: boolean = false;
  constructor(private bookSender: SenderService) {
    this.getAllBooks();
    this.fetchCategories();
  }

  getBookCategoryName(book: Book) {
    if (this.categories) {
      return this.categories.find((cat) => cat.category_id === book.category_id)?.name;
    }
    else {
      return "N/A";
    }
  }

  async getAllBooks() {
    const url = "http://localhost:3000";
    let headersList = {
      "Accept": "*/*",
    }

    let response = await fetch(url, {
      method: "GET",
      headers: headersList
    });

    let data = await response.text();
    this.books = JSON.parse(data);
  }

  async fetchCategories() {
    let headersList = {
      "Accept": "*/*",
    }

    let response = await fetch("http://localhost:3000/cats", {
      method: "GET",
      headers: headersList
    });

    let data = await response.text();
    this.categories = JSON.parse(data);
  }

  updateBookList(newBook: Book) {
    this.getAllBooks();
  }


  gotoUpdatePage() {
    this.bookSender.books = this.books;
    this.bookSender.categories = this.categories;
  }

  async deleteBook(book_id: number | null) {
    if (book_id != null)
    {

      let headersList = {
        "Accept": "*/*",
      }
      
      let response = await fetch("http://localhost:3000/del/" + book_id, {
        method: "DELETE",
        headers: headersList
      });
      
      this.getAllBooks();
    }

  }

  changeFilterByCategory(category_id: number)
  {
    this.filterByCategory = category_id;

  }

  changeAdminMode()
  {
    this.adminMode = !this.adminMode;
  }

  addToCart(bookTitle: string, bookPrice: number)
  {
    for (let index = 0; ; index++) {

      let book = localStorage.key(index);
      if (!book) break;
      if (book === bookTitle)
      {
        const bookDetail = localStorage.getItem(book);

        if (bookDetail === null) return;

        let bookDetailJson = JSON.parse(bookDetail);
        const bookCount = Number( bookDetailJson.count );
        bookDetailJson = { count: bookCount+1, price: bookPrice }
        localStorage.setItem(book, JSON.stringify(bookDetailJson));
        return;
      }
    }

    localStorage.setItem(bookTitle, JSON.stringify( {count: 1, price: bookPrice} ));
    
  }


}
