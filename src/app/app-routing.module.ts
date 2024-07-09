import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBooksComponent } from './myComponents/list-books/list-books.component';
import { UpdateBookComponent } from './myComponents/update-book/update-book.component';
import { CartComponent } from './myComponents/cart/cart.component';

const routes: Routes = [
  {path: '', component: ListBooksComponent},
  {path: 'update', component: UpdateBookComponent},
  {path: 'update/:book_id', component: UpdateBookComponent},
  {path: 'cart', component: CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
