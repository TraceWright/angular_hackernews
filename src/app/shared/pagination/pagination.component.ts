import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage: number;
  @Input() nbPages: number;
  @Input() paginateFunction: Function;
  @Input() searchString = '';

  constructor() { }

  ngOnInit() {}

  prevPage(currentPage, searchString) {
    this.paginateFunction(currentPage - 1, searchString);
  }

  nextPage(currentPage, searchString) {
    this.paginateFunction(currentPage + 1, searchString);
  }

}
