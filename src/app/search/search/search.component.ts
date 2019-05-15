import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchString = '';
  searchResults = {};
  activatedRoute: ActivatedRoute;
  type: string;
  typeParam = new BehaviorSubject<any>({queryParams: {tags: 'story'}, params: {type: "story"}}); 
  options = [{name: 'stories', value: 'story'}, {name: 'comments', value: 'comment'}, {name: 'all', value: ''}];

  
  constructor(private searchService: SearchService, activatedRoute: ActivatedRoute, private router: Router) { 
    this.activatedRoute = activatedRoute;
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(qp => {
      // if no params or if params are malformed then default to type story
      if (Object.keys(qp).length === 0 || (qp && qp.type && this.options.map(o => o.value).includes(qp.type) === false)) {
        qp = { type: 'story' };
        this.updateUrlParams(qp);
      }
      const queryParams: HttpParams = this.searchService.buildParams(qp.type, null, this.searchString);
      this.type = qp.type;
      this.searchService.searchNewsStories(queryParams).subscribe(res => {
        this.searchResults = res
      });
    })
  }

  updateUrlParams(params: Params) {
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: params, 
        queryParamsHandling: "merge",
    });
  }

  onChangeType(type) {
    const params: Params = { type: type };
    this.typeParam.next(params);
    this.updateUrlParams(params);
  }
}
