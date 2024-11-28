import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Users } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private http = inject(HttpClient);
  //private apiUrl = "https://my-json-server.typicode.com/jagova/tvshows-demo-db/tvshows";
  private apiUrl = "http://localhost:8080/api/users"
  private _user: Users[] = [];

  public fetchUsers(){
    this.http.get<Users[]>(this.apiUrl).subscribe({
      next: (response) => {
        console.log(response);
        this._user = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public get users(){
    return this._user;
  }
/* 
  public ordenarPorAbecedario() {
    this._post.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  } */


  /* public deleteElement(name: string): void {
    this._post = this._post.filter((sneaker) => sneaker.name != name);
    //console.log("Evento desde el padre");
  }

  public createElement(sneaker: Posts): void {
    console.log('Evento desde el padre');
    this._post.push(sneaker);
  } */

}
