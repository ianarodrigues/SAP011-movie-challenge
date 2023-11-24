import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-movie-container',
  templateUrl: './movie-container.component.html',
  styleUrls: ['./movie-container.component.css']
})
export class MovieContainerComponent implements OnChanges {
  @Input() movies: any[] = [];
  @Input() genre: string|undefined = '';
  @Input() orderBy: string = '';
  @Input() pageNumber: string = ''; 
  queryParams: string = '';
 
  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log({a: this.genre, b: this.orderBy});
    if (this.orderBy || this.genre){
      this.queryParams = `\?order=${this.orderBy}${this.genre !== undefined ? `&genre=${this.genre}`:``}`
    }
  }

}
