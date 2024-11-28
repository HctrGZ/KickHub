import { Sneakers } from './../../interfaces/sneakers';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CardSneakerComponent } from "../card-sneaker/card-sneaker.component";
import { Header1Component } from "../header1/header1.component";
import { NgFor } from '@angular/common';
import { SneakerServiceService } from '../../services/sneaker-service.service';

@Component({
  selector: 'app-show-gallery',
  standalone: true,
  imports: [CardSneakerComponent, Header1Component, NgFor ],
  templateUrl: './show-gallery.component.html',
  styleUrl: './show-gallery.component.css'
})
export class ShowGalleryComponent {

  private SneakersService = inject(SneakerServiceService);

  @Output() cartUpdated = new EventEmitter<Sneakers[]>();  // Emitir el carrito actualizado

  public cart: Sneakers[] = []; 

  constructor(){
    this.SneakersService.fetchSneakers();

    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }

  public get sneakers(): Sneakers[]{
    return this.SneakersService.sneakers;
  }  


  // Método para agregar un sneaker al carrito
  onAddToCart(sneaker: Sneakers) {
    console.log('Sneaker agregado al carrito:', sneaker);

    // Verificar si el sneaker ya está en el carrito
    const existingItem = this.cart.find(item => item.name === sneaker.name);

    if (existingItem) {
      // Si ya existe, incrementar la cantidad
      existingItem.quantity++; 
    } else {
      // Si no existe, agregarlo con cantidad 1
      const newItem = { ...sneaker, quantity: 1 };  
      this.cart.push(newItem);
    }

    // Emitir el carrito actualizado
    this.cartUpdated.emit(this.cart);

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  onCartUpdated(updatedCart: Sneakers[]) {
    this.cart = updatedCart;
    localStorage.setItem('cart', JSON.stringify(this.cart)); // Actualizar localStorage
  }
  

}

