import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IBook } from '../entities/book.interface';

@Injectable()
export class BookListService {

  serviceURL = `${environment.baseURL}/book`

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<IBook>> {
    return this.http.get<Array<IBook>>(this.serviceURL);
  }

  search(searchTerm: string): Observable<Array<IBook>> {
    return this.http.get<Array<IBook>>(`${this.serviceURL}/search/${searchTerm}`);
  }
}
