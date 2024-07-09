import { Component, OnChanges, SimpleChanges} from '@angular/core';
import { LocalCart } from 'src/app/Book';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnChanges{

  componentName: string;
  booksOnCart: LocalCart[];
  totalBooks: number;

  constructor() {
    this.componentName = "Cart";
    this.booksOnCart = [];
    this.totalBooks = 0;
    for (let index = 0; ; index++) {
      let book = localStorage.key(index);
      if (!book) break // No books

      const bookCount = Number(localStorage.getItem(book));
      this.booksOnCart.push( {name: book, count: bookCount} );
      this.calculateTotalBooks()

    }
  }

  calculateTotalBooks()
  {
          this.totalBooks = this.booksOnCart.reduce( (acc, book) => {

        return {name: acc.name, count: (acc.count + book.count)}

      } ).count;
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

  
  ngOnChanges(changes: SimpleChanges): void {
      this.calculateTotalBooks()
  }


}
