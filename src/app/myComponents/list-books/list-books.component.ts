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
export class ListBooksComponent implements OnInit {
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

  ngOnInit(): void {
  }

}
