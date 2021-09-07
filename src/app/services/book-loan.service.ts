import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IBook } from '../entities/book.interface';

@Injectable()
export class BookLoanService {
  serviceURL = `${environment.baseURL}/book`

  constructor(private http: HttpClient) { }

  loan(book: IBook, user: string): Observable<void> {
    return this.http.post<void>(`${this.serviceURL}/${book.id}/loanTo/${user}`, {});
  }
}
