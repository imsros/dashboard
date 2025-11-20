import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './pages/book-list/book-list.component';
import { BookAddComponent } from './pages/book-add/book-add.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';

const routes: Routes = [
  {path: '', component: BookListComponent},
  {path: 'add', component: BookAddComponent},
  {path: 'detail', component:BookDetailComponent},
  {path: 'edit/:id', component: BookAddComponent},
  {path: 'delete/:id', component: BookListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
