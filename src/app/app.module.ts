import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListBooksComponent } from './myComponents/list-books/list-books.component';
import { UpdateBookComponent } from './myComponents/update-book/update-book.component';
import { AddBookComponent } from './myComponents/add-book/add-book.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './myComponents/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ListBooksComponent,
    UpdateBookComponent,
    AddBookComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
