import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchResultsModel } from './searchmodels/searchresultsmodel';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseSearchUrl = 'http://hn.algolia.com/api/v1/search';
  searchResults = this.initSearchResultsSubject();

  constructor(private http: HttpClient) { }

  buildParams(type: string, page: number, searchString: string): HttpParams {
    let params: HttpParams = new HttpParams().set('tags', type);
    params = (page || page === 0) ? params.append('page', page.toString()) : params;
    params = (searchString && searchString.length > 0) ? params.append('query', searchString) : params;
    return params;
  }

  searchNewsStories(params: HttpParams): Observable<Object> {
    return this.http.get(`${this.baseSearchUrl}`, { params: params });
  }

  onResults() {
    return this.searchResults.asObservable();
  }

  searchService(params: HttpParams) {
    this.searchNewsStories(params).subscribe((results: SearchResultsModel) => {
      this.searchResults.next(results)
    });
  }

  initSearchResultsSubject(): BehaviorSubject<SearchResultsModel> {
    return new BehaviorSubject<SearchResultsModel>({
      hits: new Array,
      hitsPerPage: null,
      nbHits: null,
      nbPages: null,
      page: null,
      params: '',
      processingTimeMS: null,
      query: '',
    });
  }
}
