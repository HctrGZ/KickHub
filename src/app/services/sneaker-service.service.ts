import { HttpClient } from '@angular/common/http';
import { Sneakers } from '../interfaces/sneakers';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SneakerServiceService {

  constructor() { }

  private http = inject(HttpClient);
  //private apiUrl = "https://my-json-server.typicode.com/jagova/tvshows-demo-db/tvshows";
  private apiUrl = "http://localhost:8080/api/sneakers"
  private _sneakers: Sneakers[] = [];

  private sneakersSubject = new BehaviorSubject<Sneakers[]>([]);  // Este es el observable que la vista va a suscribirse
  sneakers$ = this.sneakersSubject.asObservable();  // Hacemos el observable público

  private getToken(): string | null {
    return localStorage.getItem('token');  // Devuelve el token o null si no está presente
  }

  public fetchSneakers(){
    const token = this.getToken();
    this.http.get<Sneakers[]>(this.apiUrl,  {
      headers: {
        "Authorization": `${token}`
      }
    }).subscribe({
      next: (response) => {
        console.log(response);
        this._sneakers = response;
        this.sneakersSubject.next(this._sneakers);
      },
      error: (error) => {
        console.log(error);
      }
    });
    
  }

  public get sneakers(){
    return this._sneakers;
  }

  public filterSneakers(query: string): Sneakers[] {
    return this._sneakers.filter(sneaker =>
      sneaker.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  



  public createSneaker(newSneaker: Sneakers) {
    const token = this.getToken();
    if (!token) {
      console.log("No token found.");
      return;
    }
    console.log('Sending new sneaker to API:', newSneaker);
  
    this.http.post<Sneakers>(this.apiUrl, newSneaker, {
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      }
    }).subscribe({
      next: (response) => {
        console.log("Sneaker created:", response);
        this._sneakers.push(response);
      },
      error: (error) => {
        console.log("Error creating Sneaker:", error);
      }
    });
  }

  public updateSneaker(id: string, updatedSneaeker: Partial<Sneakers>) {
    const token = this.getToken();
    if (!token) {
      console.log("No token found.");
      return;
    }

    this.http.put<Sneakers>(`${this.apiUrl}/${id}`, updatedSneaeker, {
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      }
    }).subscribe({
      next: (response) => {
        console.log("Sneaker updated:", response);
        const index = this._sneakers.findIndex(sneaker => sneaker._id === id); 
        if (index !== -1) {
          this._sneakers[index] = response; 
        }
        this.fetchSneakers();
      },
      error: (error) => {
        console.log("Error updating sneaker:", error);
      }
    });
  }
  
  public deleteSneaker(id: string) {
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
        console.log("sneaker deleted:", id);
        this._sneakers = this._sneakers.filter(sneaker => sneaker._id !== id);
      },
      error: (error) => {
        console.log("Error deleting sneaker:", error);
      }
    });
  }

}
