import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { SneakerServiceService } from '../../services/sneaker-service.service';
import { Sneakers } from '../../interfaces/sneakers';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar-cart',
  standalone: true,
  imports: [SidebarModule, NgFor, NgIf],
  templateUrl: './sidebar-cart.component.html',
  styleUrl: './sidebar-cart.component.css'
})
export class SidebarCartComponent {

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  @Input() sidebarVisible: boolean = false; 
  @Output() sidebarVisibleChange = new EventEmitter<boolean>();

  @Output() cartUpdated = new EventEmitter<Sneakers[]>();  
  @Input() cart: Sneakers[] = [];

  closeSidebar(): void {
    this.sidebarVisible = false;
    this.sidebarVisibleChange.emit(this.sidebarVisible); 
  }

  onRemoveFromCart(sneaker: Sneakers) {
    if (sneaker.quantity > 1) {
      sneaker.quantity--;
    } else {
      this.cart = this.cart.filter(item => item.name !== sneaker.name);
    }
    this.cartUpdated.emit(this.cart); 
    localStorage.setItem('cart', JSON.stringify(this.cart)); 
  }

  getTotalPrice(): number {
    if (!this.cart || this.cart.length === 0) {
      return 0;
    }
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  
  

 /*  onRemoveFromCart(sneaker: Sneakers) {
    // Filtrar el sneaker que se va a eliminar
    this.cart = this.cart.filter(item => item.name !== sneaker.name);
    // Emitir el carrito actualizado
    this.cartUpdated.emit(this.cart);
    // Actualizar el carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(this.cart));
  } */

 
}
