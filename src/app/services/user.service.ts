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

  public createUser(newUser: Users) {
    const token = this.getToken();
    if (!token) {
      console.log("No token found.");
      return;
    }
  
    this.http.post<Users>(this.apiUrl, newUser, {
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      }
    }).subscribe({
      next: (response) => {
        console.log("User created:", response);
        this._user.push(response);
      },
      error: (error) => {
        console.log("Error creating post:", error);
      }
    });
  }

  public updateUser(id: string, updatedUser: Partial<Users>) {
    const token = this.getToken();
    if (!token) {
      console.log("No token found.");
      return;
    }

    this.http.put<Users>(`${this.apiUrl}/${id}`, updatedUser, {
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      }
    }).subscribe({
      next: (response) => {
        console.log("User updated:", response);
        const index = this._user.findIndex(user => user._id === id); 
        if (index !== -1) {
          this._user[index] = response; 
        }
      },
      error: (error) => {
        console.log("Error updating user:", error);
      }
    });
  }
  
  public deleteUser(id: string) {
    const token = this.getToken();
    if (!token) {
      console.log("No token found.");
      return;
    }

    this.http.delete(`${this.apiUrl}/${id}`, {
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      }
    }).subscribe({
      next: () => {
        console.log("User deleted:", id);
        this._user = this._user.filter(post => post._id !== id);
      },
      error: (error) => {
        console.log("Error deleting user:", error);
      }
    });
  }

}
