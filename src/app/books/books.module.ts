import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PoFieldModule, PoInfoModule, PoListViewModule, PoModalModule, PoPageModule, PoPopupModule, PoTableModule } from '@po-ui/ng-components';
import { BookListService } from '../services/book-list.service';
import { BookLoanService } from '../services/book-loan.service';
import { BookReturnService } from '../services/book-return.service';
import { BooksComponent } from './books.component';
import { BookStatusPipe } from './pipes/book-status.pipe';

const routes: Routes = [
  {
    path: '',
    component: BooksComponent
  }
];

@NgModule({
  declarations: [
    BookStatusPipe,
    BooksComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    PoPageModule,
    PoListViewModule,
    PoInfoModule,
    PoModalModule,
    PoFieldModule
  ],
  exports: [ BooksComponent ],
  providers: [
    BookListService,
    BookLoanService,
    BookReturnService
  ]
})
export class BooksModule {}
