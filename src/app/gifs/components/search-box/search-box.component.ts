import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  @ViewChild('txtinput')
  taginput!:ElementRef<HTMLInputElement>;

  constructor(private gifsService:GifsService) {

  }

  searchTag(){
    const newTag = this.taginput.nativeElement.value;

    this.gifsService.searchTag(newTag);

    this.taginput.nativeElement.value='';
  }
}
