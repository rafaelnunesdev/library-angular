import { Component, OnInit, ViewChild } from '@angular/core';
import { PoListViewAction, PoModalAction, PoModalComponent, PoPageFilter, PoTableColumn } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { BookStatusEnum } from '../entities/book-status.enum';
import { IBook } from '../entities/book.interface';
import { BookListService } from '../services/book-list.service';
import { BookLoanService } from '../services/book-loan.service';
import { BookReturnService } from '../services/book-return.service';
import { BookStatusPipe } from './pipes/book-status.pipe';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: [ BookStatusPipe ]
})
export class BooksComponent implements OnInit {

  readonly actions: Array<PoListViewAction> = [
    {
      label: 'Loan',
      action: this.openLoandModal.bind(this),
      disabled: this.bookUnavailable.bind(this),
      icon: 'po-icon-exit'
    },
    {
      label: 'Return',
      action: this.return.bind(this),
      disabled: this.bookAvailable.bind(this),
      icon: 'po-icon-calendar-ok'
    }
  ];

  books: Array<IBook> = [];

  readonly filterSettings: PoPageFilter = {
    action: this.filterBooks.bind(this),
    placeholder: 'Search'
  };

  loanUser: string;
  selectedBook: IBook;

  @ViewChild(PoModalComponent, { static: false })
  modal: PoModalComponent;

  primaryAction: PoModalAction = {
    action: () => {
      this.loan(this.selectedBook, this.loanUser);
      this.loanUser = '';
      this.modal.close();
    },
    label: 'Confirm'
  };

  constructor(
    private bookListService: BookListService,
    private bookLoanService: BookLoanService,
    private bookReturnService: BookReturnService,
    private bookStatusPipe: BookStatusPipe
  ) { }

  ngOnInit(): void {
    this.getBooks(this.bookListService.getAll());
  }

  getBooks(request: Observable<Array<IBook>>) {
    request.subscribe(books => this.books = books);
  }

  filterBooks(searchTerm: string) {
    const request = searchTerm && searchTerm.trim().length > 0 ? this.bookListService.search(searchTerm) : this.bookListService.getAll();
    this.getBooks(request);
  }

  loan(book: IBook, user: string) {
    this.bookLoanService.loan(book, user).subscribe(() => this.getBooks(this.bookListService.getAll()));
  }

  return(book: IBook) {
    this.bookReturnService.return(book).subscribe(() => this.getBooks(this.bookListService.getAll()));
  }

  bookAvailable(book: IBook) {
    return this.bookStatusPipe.transform(book) === BookStatusEnum.AVAILABLE;
  }

  bookUnavailable(book: IBook) {
    return this.bookStatusPipe.transform(book) === BookStatusEnum.UNAVAILABLE;
  }

  openLoandModal(book: IBook) {
    this.selectedBook = book;
    this.modal.open();
  }
}
