import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-top-content',
  templateUrl: './top-content.component.html',
  styleUrls: ['./top-content.component.css'],
})
export class TopContentComponent { 
  @Input() genres: any[] = [];
  @Input() orderBy: any[] = [];
  @Input() moviesByGenre: any[] = [];
  @Output() filterChanged: EventEmitter<{ genreId: string; orderBy: string; keyWord: string }> =
    new EventEmitter<{ genreId: string; orderBy: string; keyWord: string }>();

  orderByList: any[] = [
    {
      order: 'popularity.desc',
      text: 'Most popular movies',
    },
    {
      order: 'popularity.asc',
      text: 'Least popular movies',
    },
    {
      order: 'primary_release_date.desc',
      text: 'Earliest realease date',
    },
    {
      order: 'primary_release_date.asc',
      text: 'Latest release date',
    },
    {
      order: 'vote_average.desc',
      text: 'Most voted',
    },
    {
      order: 'vote_count.asc',
      text: 'Least voted',
    }
    
  ];
  selectedGenre: string = '0';
  selectedOrder: string = this.orderByList[0].order;
  keyWord: string = '';

  constructor() {}

  optionsChange() { 
    this.filterChanged.emit({
      genreId: this.selectedGenre,
      orderBy: this.selectedOrder, 
      keyWord: this.keyWord,
    });

  }

}
 


