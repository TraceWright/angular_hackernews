import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { SearchService } from '../../search/search.service';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'search-bar',
  templateUrl: './search.bar.component.html',
  styleUrls: ['./search.bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @ViewChild('searchInput') searchInput: ElementRef;
  @Input() searchString: string;
  @Input() type: string;
  @Output() searchStringChange = new EventEmitter();
  
  constructor(private searchService: SearchService) { }

  ngOnInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      ,filter(res => res.length >= 0)
      ,debounceTime(800)        
      ,distinctUntilChanged()
      ).subscribe((searchString: string) => {
        this.searchStringChange.emit(searchString);
        this.searchService.searchService(new HttpParams().set('tags', this.type).set('query', searchString));
      });
  }
}
