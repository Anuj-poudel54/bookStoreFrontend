import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book, LocalCart } from 'src/app/Book';
import { Category } from 'src/app/Category';
import { SenderService } from 'src/app/sender.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  componentName: string;
  booksOnCart: LocalCart[];

  constructor() {
    this.componentName = "Cart";
    this.booksOnCart = [];
    for (let index = 0; ; index++) {
      let book = localStorage.key(index);
      if (!book) break // No books

      const bookCount = Number(localStorage.getItem(book));
      this.booksOnCart.push( {name: book, count: bookCount} );
    }
  }
  clearCart()
  {
    const clear = confirm("All item will be removed!");

    if (!clear) return;
    localStorage.clear();
    this.booksOnCart = [];
  }

  removeBookFromCart(bookTitle: string)
  {
    this.booksOnCart = this.booksOnCart.filter( (book: LocalCart) => !(book.name === bookTitle) );
    localStorage.removeItem(bookTitle);
  }

  ngOnInit(): void {
  }

}
