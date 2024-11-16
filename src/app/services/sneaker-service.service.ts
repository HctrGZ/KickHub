import { HttpClient } from '@angular/common/http';
import { Sneakers } from '../interfaces/sneakers';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SneakerServiceService {

  constructor() { }

  private http = inject(HttpClient);
  private apiUrl = "https://my-json-server.typicode.com/jagova/tvshows-demo-db/tvshows";
  //private apiUrl = "http://localhost:8080/api/tvshows"
  private _sneakers: Sneakers[] = [];

  public fetchSneakers(){
    this.http.get<Sneakers[]>(this.apiUrl).subscribe({
      next: (response) => {
        console.log(response);
        this._sneakers = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public get sneakers(){
    return this._sneakers;
  }

  public ordenarPorAbecedario() {
    this._sneakers.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }


  public deleteElement(name: string): void {
    this._sneakers = this._sneakers.filter((sneaker) => sneaker.name != name);
    //console.log("Evento desde el padre");
  }

  public createElement(sneaker: Sneakers): void {
    console.log('Evento desde el padre');
    this._sneakers.push(sneaker);
  }

}