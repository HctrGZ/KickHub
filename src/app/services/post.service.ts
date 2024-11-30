import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Posts } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  private http = inject(HttpClient);
  //private apiUrl = "https://my-json-server.typicode.com/jagova/tvshows-demo-db/tvshows";
  private apiUrl = "http://localhost:8080/api/posts"
  private _post: Posts[] = [];

  private getToken(): string | null {
    return localStorage.getItem('token');  // Devuelve el token o null si no está presente
  }

  public fetchPosts(){
    const token = this.getToken();
    console.log(token, "ola");
    this.http.get<Posts[]>(this.apiUrl, {
      headers: {
        "Authorization": `${token}`
      }
    }).subscribe({
      next: (response) => {
        console.log(response);
        this._post = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public get posts(){
    return this._post;
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
