import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { IBook } from '../entities/book.interface';
import { BookLoanService } from './book-loan.service';

describe('BookLoanService', () => {
  let service: BookLoanService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>(['post']);
    httpClientSpy.post.and.returnValue(of(null));
    service = new BookLoanService(httpClientSpy as any);
  });

  it('Should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('Should return after http call', (done: DoneFn) => {
    const book: IBook = {
      id: 1,
      name: 'Book 1',
      author: 'Author 1',
      loans: []
    };

    service.loan(book, 'user').subscribe(() => {
      expect(httpClientSpy.post).toHaveBeenCalled();
      done();
    }, done.fail);
  });
});
