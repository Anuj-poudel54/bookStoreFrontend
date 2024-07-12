import { Component, OnChanges, SimpleChanges} from '@angular/core';
import { LocalCart } from 'src/app/Book';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent{

  componentName: string;
  booksOnCart: LocalCart[];
  totalBooks: number;
  totalPrice: number;

  constructor() {
    this.componentName = "Cart";
    this.booksOnCart = [];
    this.totalBooks = 0;

    for (let index = 0; ; index++) {
      let book = localStorage.key(index);
      if (!book) break // No books

      const bookDetailString = localStorage.getItem(book);
      if (bookDetailString === null) return;
      const bookDetailJson = JSON.parse(bookDetailString);

      const bookCount = bookDetailJson.count;

      this.booksOnCart.push( {name: book, count: bookCount, price: bookDetailJson.price} );
      this.calculateBooksStats()

    }
  }

  calculateBooksStats()
  {
      if (this.booksOnCart.length == 0){
        this.totalBooks= 0;
        return;
      }

      this.totalBooks = this.booksOnCart.reduce( (acc, book) => {

        return {...book, count: (acc.count + book.count)}

      } ).count;

      this.totalPrice = this.booksOnCart.reduce( (acc, book) => {

        return {...book, price: (acc.price + book.price)}

      } ).price;
  }

  clearCart()
  {
    const clear = confirm("All item will be removed!");

    if (!clear) return;
    localStorage.clear();
    this.booksOnCart = [];
    this.calculateBooksStats();
  }

  removeBookFromCart(bookTitle: string)
  {
    this.booksOnCart = this.booksOnCart.filter( (book: LocalCart) => !(book.name === bookTitle) );
    localStorage.removeItem(bookTitle);
    this.calculateBooksStats();
  }

}
