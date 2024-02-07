import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class GifsService {

private _tagsHistory:string[] = [];

constructor() { }

get tagsHistory(){
  return  [...this._tagsHistory];
}

private organizeHistory(tag:string){
  tag = tag.toLowerCase();
  if(this._tagsHistory.includes(tag)){
    this._tagsHistory = this.tagsHistory.filter((oldTag)=> oldTag !== tag);
  }
  this._tagsHistory = this._tagsHistory.splice(0,9);
}

searchTag(tag:string):void {
  if(tag.length === 0) return;
  this.organizeHistory(tag);

  this._tagsHistory.unshift(tag);
}


}
