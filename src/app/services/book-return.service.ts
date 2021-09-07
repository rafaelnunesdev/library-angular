import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IBook } from '../entities/book.interface';

@Injectable()
export class BookReturnService {
  serviceURL = `${environment.baseURL}/book`

  constructor(private http: HttpClient) { }

  return(book: IBook): Observable<void> {
    return this.http.post<void>(`${this.serviceURL}/${book.id}/return`, {});
  }
}
