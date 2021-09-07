import { of } from 'rxjs';
import { BookStatusEnum } from '../entities/book-status.enum';
import { IBook } from '../entities/book.interface';
import { BookListService } from '../services/book-list.service';
import { BookLoanService } from '../services/book-loan.service';
import { BookReturnService } from '../services/book-return.service';
import { BooksComponent } from './books.component';
import { BookStatusPipe } from './pipes/book-status.pipe';

describe('BooksComponent', () => {
  let component: BooksComponent;

  const books: Array<IBook> = [
    {
      id: 1,
      name: 'Book 1',
      author: 'Author 1',
      loans: []
    },
    {
      id: 2,
      name: 'Book 2',
      author: 'Author 2',
      loans: [
        {
          user: 'User 1',
          borrowed: '2021-09-07T03:00:00Z',
          returned: '0001-01-01T00:00:00Z'
        }
      ]
    },
    {
      id: 3,
      name: 'Book 3',
      author: 'Author 3',
      loans: [
        {
          user: 'User 2',
          borrowed: '2021-09-07T03:00:00Z',
          returned: '2021-09-07T03:00:00Z'
        }
      ]
    }
  ];

  let bookListServiceSpy = jasmine.createSpyObj<BookListService>(['getAll', 'search']);
  bookListServiceSpy.getAll.and.returnValue(of(books));
  bookListServiceSpy.search.and.returnValue(of(books));

  let bookLoanServiceSpy = jasmine.createSpyObj<BookLoanService>(['loan']);
  bookLoanServiceSpy.loan.and.returnValue(of());

  let bookReturnServiceSpy = jasmine.createSpyObj<BookReturnService>(['return']);
  bookReturnServiceSpy.return.and.returnValue(of());

  let bookStatusPipeSpy = jasmine.createSpyObj<BookStatusPipe>(['transform']);
  bookStatusPipeSpy.transform.and.returnValue(BookStatusEnum.AVAILABLE);

  beforeEach(() => {
    component = new BooksComponent(bookListServiceSpy, bookLoanServiceSpy, bookReturnServiceSpy, bookStatusPipeSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
