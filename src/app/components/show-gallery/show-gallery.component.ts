import { Sneakers } from './../../interfaces/sneakers';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CardSneakerComponent } from '../card-sneaker/card-sneaker.component';
import { Header1Component } from '../header1/header1.component';
import { NgFor } from '@angular/common';
import { SneakerServiceService } from '../../services/sneaker-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-gallery',
  standalone: true,
  imports: [CardSneakerComponent, Header1Component, NgFor, FormsModule],
  templateUrl: './show-gallery.component.html',
  styleUrl: './show-gallery.component.css',
})
export class ShowGalleryComponent {
  private SneakersService = inject(SneakerServiceService);

  @Output() cartUpdated = new EventEmitter<Sneakers[]>();

  public cart: Sneakers[] = [];
  public searchQuery: string = '';
  public filteredSneakers: Sneakers[] = [];

  constructor() {
    this.SneakersService.sneakers$.subscribe((sneakers) => {
      this.filteredSneakers = sneakers;
    });

    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }

    this.SneakersService.fetchSneakers();
  }

  onSearchChange(query: string) {
    this.searchQuery = query;
    this.filteredSneakers = this.SneakersService.sneakers.filter((sneaker) =>
      sneaker.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  onAddToCart(sneaker: Sneakers) {
    const existingItem = this.cart.find((item) => item.name === sneaker.name);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newItem = { ...sneaker, quantity: 1 };
      this.cart.push(newItem);
    }

    this.cartUpdated.emit(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  onCartUpdated(updatedCart: Sneakers[]) {
    this.cart = updatedCart;
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
