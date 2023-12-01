import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-movie-container',
  templateUrl: './movie-container.component.html',
  styleUrls: ['./movie-container.component.css']
})
export class MovieContainerComponent implements OnChanges {
  @Input() movies: any[] = [];
  @Input() genre: string | undefined = '';
  @Input() orderBy: string | undefined = '';
  @Input() pageNumber: string | undefined = ''; 
  queryParams: any = {};
 
  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.orderBy || this.genre){
      this.queryParams = {
        order: this.orderBy, 
        genre: this.genre,
        pageNumber: this.pageNumber
      } 
    }
  }

}
