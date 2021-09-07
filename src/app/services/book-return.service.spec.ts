import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { IBook } from '../entities/book.interface';
import { BookReturnService } from './book-return.service';

describe('BookReturnService', () => {
  let service: BookReturnService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>(['post']);
    httpClientSpy.post.and.returnValue(of(null));
    service = new BookReturnService(httpClientSpy as any);
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

    service.return(book).subscribe(() => {
      expect(httpClientSpy.post).toHaveBeenCalled();
      done();
    }, done.fail);
  });
});
