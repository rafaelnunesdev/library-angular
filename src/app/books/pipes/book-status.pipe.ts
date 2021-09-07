import { Pipe, PipeTransform } from '@angular/core';
import { BookStatusEnum } from '../../entities/book-status.enum';
import { IBook } from '../../entities/book.interface';

@Pipe({ name: 'bookStatus' })
export class BookStatusPipe implements PipeTransform {

  transform(value: IBook): BookStatusEnum {

    const lastLoan = value.loans && value.loans.length > 0 ? value.loans[value.loans.length - 1] : null;
    if (lastLoan) {
      const returned = new Date(lastLoan.returned);
      return returned.getFullYear() ? BookStatusEnum.AVAILABLE : BookStatusEnum.UNAVAILABLE;
    }

    return BookStatusEnum.AVAILABLE;
  }
}
