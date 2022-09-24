import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './myComponents/add-book/add-book.component';
import { ListBooksComponent } from './myComponents/list-books/list-books.component';
import { UpdateBookComponent } from './myComponents/update-book/update-book.component';

const routes: Routes = [
  {path: '', component: ListBooksComponent},
  {path: 'update', component: UpdateBookComponent},
  {path: 'update/:book_id', component: UpdateBookComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
