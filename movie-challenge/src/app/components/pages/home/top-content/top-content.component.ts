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
export class TopContentComponent { //implements OnInit, OnDestroy
  //implements OnChanges
  @Input() genres: any[] = [];
  @Input() orderBy: any[] = [];
  @Input() moviesByGenre: any[] = [];
  @Output() filterChanged: EventEmitter<{ genreId: string; orderBy: string; keyWord: string }> =
    new EventEmitter<{ genreId: string; orderBy: string; keyWord: string }>();
  // @ViewChild("filter") filter!: ElementRef;


  orderByList: any[] = [
    // vetor de objetos para renderizar, onde os usuários possam clicar e alterar a ordenação
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
      text: 'Latest release date',
    },
    {
      order: 'primary_release_date.asc',
      text: 'Earliest realease date',
    },
    {
      order: 'vote_average.asc',
      text: 'Most voted',
    },
    {
      order: 'vote_average.desc',
      text: 'Least voted',
    },
  ];
  selectedGenre: string = '0';
  selectedOrder: string = this.orderByList[0].order;
  keyWord: string = '';

  constructor() {}

  // ngOnInit(): void {
    
  //   // Recupera os valores dos filtros do localStorage ao inicializar o componente
  //   const storedGenre = localStorage.getItem('selectedGenre');
  //   const storedOrder = localStorage.getItem('selectedOrder');
  //   const storedKeyWord = localStorage.getItem('keyWord');

  //   if (storedGenre !== null) {
  //     this.selectedGenre = storedGenre;
  //   }

  //   if (storedOrder !== null) {
  //     this.selectedOrder = storedOrder;
  //   }

  //   if (storedKeyWord !== null) {
  //     this.keyWord = storedKeyWord;
  //   }
  // }

  // ngOnDestroy(): void {
  //   // Armazena os valores dos filtros no localStorage ao destruir o componente
  //   localStorage.setItem('selectedGenre', this.selectedGenre);
  //   localStorage.setItem('selectedOrder', this.selectedOrder);
  //   localStorage.setItem('keyWord', this.keyWord);
  // }

  optionsChange() { 
    console.log(`${this.selectedGenre} - ${this.selectedOrder}`);
    this.filterChanged.emit({
      genreId: this.selectedGenre,
      orderBy: this.selectedOrder, 
      keyWord: this.keyWord,
    });

  }

}
 


