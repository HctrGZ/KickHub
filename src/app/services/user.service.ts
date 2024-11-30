import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Users } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private getToken(): string | null {
    return localStorage.getItem('token');  // Devuelve el token o null si no está presente
  }

  private http = inject(HttpClient);
  //private apiUrl = "https://my-json-server.typicode.com/jagova/tvshows-demo-db/tvshows";
  private apiUrl = "http://localhost:8080/api/users"
  private _user: Users[] = [];

  public fetchUsers(){
    const token = this.getToken();
    this.http.get<Users[]>(this.apiUrl, {
      headers: {
        "Authorization": `${token}`
      }
    }).subscribe({
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

}
