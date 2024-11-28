import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarCartComponent } from "../sidebar-cart/sidebar-cart.component";
import { Sneakers } from '../../interfaces/sneakers';

@Component({
  selector: 'app-header1',
  standalone: true,
  imports: [ButtonModule, SidebarComponent, SidebarCartComponent],
  templateUrl: './header1.component.html',
  styleUrl: './header1.component.css'
})
export class Header1Component {
  isSidebarVisible: boolean = false; // Estado del sidebar.
  isSidebarCartVisible: boolean = false;

  @Input() cart: Sneakers[] = []; 
  @Output() cartUpdated = new EventEmitter<Sneakers[]>(); 

  // Método que maneja la actualización del carrito desde show-gallery
  onCartUpdated(updatedCart: Sneakers[]) {
    this.cart = updatedCart; 
    this.cartUpdated.emit(this.cart); // Emitirlo hacia show-gallery
  }

  get totalItems(): number {
    return this.cart.reduce((total, sneaker) => total + sneaker.quantity, 0);  // Contar la cantidad total de items
  }
}
