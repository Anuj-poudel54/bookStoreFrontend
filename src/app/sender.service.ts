import { Injectable } from '@angular/core';
import { Book } from './Book';
import { Category } from './Category';

@Injectable({
  providedIn: 'root'
})
export class SenderService {
  books: Book[];
  categories: Category[];
  constructor() { }
}
