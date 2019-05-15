import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../shared/searchbar/search.bar.component';
import { SearchService } from './search.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchResultsComponent } from './searchresults/search.results.component';
import { SearchComponent } from './search/search.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';

@NgModule({
  declarations: [SearchBarComponent, SearchResultsComponent, SearchComponent, PaginationComponent],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    SearchService,
  ]
})
export class SearchModule { }
