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


  public createPost(newPost: Posts) {
    const token = this.getToken();
    if (!token) {
      console.log("No token found.");
      return;
    }
  
    this.http.post<Posts>(this.apiUrl, newPost, {
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      }
    }).subscribe({
      next: (response) => {
        console.log("Post created:", response);
        // Si quieres agregar el nuevo post a tu lista de posts:
        this._post.push(response);
      },
      error: (error) => {
        console.log("Error creating post:", error);
      }
    });
  }

  public updatePost(id: string, updatedPost: Partial<Posts>) {
    const token = this.getToken();
    if (!token) {
      console.log("No token found.");
      return;
    }

    this.http.put<Posts>(`${this.apiUrl}/${id}`, updatedPost, {
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      }
    }).subscribe({
      next: (response) => {
        console.log("Post updated:", response);
        const index = this._post.findIndex(post => post._id === id); // Usamos '_id' aquí
        if (index !== -1) {
          this._post[index] = response; // Actualizar el post en la lista
        }
        this.fetchPosts();
      },
      error: (error) => {
        console.log("Error updating post:", error);
      }
    });
  }
  
  public deletePost(id: string) {
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
        console.log("Post deleted:", id);
        this._post = this._post.filter(post => post._id !== id); // Usamos '_id' aquí
      },
      error: (error) => {
        console.log("Error deleting post:", error);
      }
    });
  }
  
  

}
