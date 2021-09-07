import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { IBook } from '../entities/book.interface';
import { BookListService } from './book-list.service';

describe('BookListService', () => {
  let service: BookListService;
  let httpClientSpy: { get: jasmine.Spy };

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

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>(['get']);
    httpClientSpy.get.and.returnValue(of(books));
    service = new BookListService(httpClientSpy as any);
  });

  it('Should create service', () => {
    expect(service).toBeTruthy();
  });

  it('Should return all books', (done: DoneFn) => {
    service.getAll().subscribe(booksResult => {
      expect(booksResult).toEqual(books);
      expect(httpClientSpy.get).toHaveBeenCalledWith(service.serviceURL);
      done();
    }, done.fail);
  });

  it('Should return books filtering with searchTerm', (done: DoneFn) => {
    service.search('searchTerm').subscribe(booksResult => {
      expect(booksResult).toEqual(books);
      expect(httpClientSpy.get).toHaveBeenCalledWith(`${service.serviceURL}/search/searchTerm`);
      done();
    }, done.fail);
  });
});
