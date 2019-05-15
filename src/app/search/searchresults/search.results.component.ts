import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../search.service';
import { SearchResultsModel } from '../searchmodels/searchresultsmodel';

@Component({
  selector: 'search-results',
  templateUrl: './search.results.component.html',
  styleUrls: ['./search.results.component.css']
})
export class SearchResultsComponent implements OnInit {

  @Input() searchResults: SearchResultsModel;
  @Input() searchString: string;
  @Input() type: string;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.onResults().subscribe((results: SearchResultsModel) => {
      this.searchResults = results;
    });
  }

  paginateFunction = (paginatingTo, searchString): void => {
    const params = this.searchService.buildParams(this.type, paginatingTo, searchString);
    this.searchService.searchNewsStories(params).subscribe((results: SearchResultsModel) => {
      this.searchResults = results;
    });
  }
}
