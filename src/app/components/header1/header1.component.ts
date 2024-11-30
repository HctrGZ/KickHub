import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarCartComponent } from '../sidebar-cart/sidebar-cart.component';
import { Sneakers } from '../../interfaces/sneakers';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header1',
  standalone: true,
  imports: [ButtonModule, SidebarComponent, SidebarCartComponent, NgIf],
  templateUrl: './header1.component.html',
  styleUrl: './header1.component.css',
})
export class Header1Component {
  isSidebarVisible: boolean = false;
  isSidebarCartVisible: boolean = false;

  @Input() cart: Sneakers[] = [];
  @Output() cartUpdated = new EventEmitter<Sneakers[]>();

  authService = inject(AuthService);
  userRole: any;
  ngOnInit(): void {
    this.userRole = this.authService.getRoleFromToken();
  }

  isUser(): boolean {
    if (this.userRole) {
      return true;
    }
    return false;
  }

  onCartUpdated(updatedCart: Sneakers[]) {
    this.cart = updatedCart;
    this.cartUpdated.emit(this.cart);
  }

  get totalItems(): number {
    return this.cart.reduce((total, sneaker) => total + sneaker.quantity, 0);
  }
}
