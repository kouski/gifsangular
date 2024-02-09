import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})


export class GifsService {

gifList:Gif[] = [];

private _tagsHistory:string[] = [];
private api_key:string = 'wdaefRXKTVBjRjuCBOjXiQuXk7m2A2ov';
private serviceUrl:string = 'https://api.giphy.com/v1/gifs';

constructor(private http:HttpClient) { }

get tagsHistory(){
  return  [...this._tagsHistory];
}

private organizeHistory(tag:string){
  tag = tag.toLowerCase();
  if(this._tagsHistory.includes(tag)){
    this._tagsHistory = this.tagsHistory.filter((oldTag)=> oldTag !== tag);
  }
  this._tagsHistory = this._tagsHistory.splice(0,9);
  this.saveLocalStorage();
}

private saveLocalStorage():void{
  localStorage.setItem('history', JSON.stringify(this._tagsHistory));
}

searchTag(tag:string):void {
  if(tag.length === 0) return;
  this.organizeHistory(tag);
  this._tagsHistory.unshift(tag);

  const params = new HttpParams()
  .set('api_key', this.api_key)
  .set('limit','12')
  .set('q',tag)



  this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params:params})
  .subscribe(resp=>{

    this.gifList = resp.data;

  })

}


}
