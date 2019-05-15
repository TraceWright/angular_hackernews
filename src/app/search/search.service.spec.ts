import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SearchService } from './search.service';
import { SearchResultsModel } from './searchmodels/searchresultsmodel';
import { HttpParams } from '@angular/common/http';

describe('SearchService', () => {
  let injector: TestBed;
  let service: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => { 
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    injector = getTestBed();
    service = injector.get(SearchService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: SearchService = TestBed.get(SearchService);
    expect(service).toBeTruthy();
  });

  describe('#paginationRequest', () => {
    it('should return an Observable<SearchResultsModel>', () => {
      
      const searchResultHits  = [
        {author: '', points: 1, title: '', url: ''},
        {author: '', points: 2, title: '', url: ''}
      ];

      const dummyResults: SearchResultsModel = {
          hits: searchResultHits,
          hitsPerPage: null,
          nbHits: null,
          nbPages: null,
          page: null,
          params: '',
          processingTimeMS: null,
          query: '',
      };
      const params = new HttpParams().set('tags', 'story').set('query', 'test');
      service.searchNewsStories(params).subscribe((results: SearchResultsModel) => {
        expect(results.hits.length).toBe(2);
        expect(results).toEqual(dummyResults);
      });
  
      const req = httpMock.expectOne(`${service.baseSearchUrl}?tags=story&query=test`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyResults);
    });
  });

  describe('#null params', () => {  
    it('should search with no params', () => {
      service.searchNewsStories(null).subscribe((results: SearchResultsModel) => {
      });
      httpMock.expectOne(`${service.baseSearchUrl}`);
    });
  });

});
