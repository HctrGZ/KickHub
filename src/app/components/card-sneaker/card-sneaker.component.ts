import { AuthService } from './../../services/auth.service';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output  } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Sneakers } from '../../interfaces/sneakers';
import { DialogModule } from 'primeng/dialog';
import { NgClass, NgIf } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { DividerModule } from 'primeng/divider';


@Component({
  selector: 'app-card-sneaker',
  standalone: true,
  imports: [CardModule, ButtonModule, DialogModule,NgClass, SidebarModule,DividerModule, NgIf],
  templateUrl: './card-sneaker.component.html',
  styleUrl: './card-sneaker.component.css'
})

export class CardSneakerComponent {
  @Input()
  /*   public sneaker: Sneakers = {
    name: '',
    description: '',
    image: '',
    sizeRange: [],
    brandName: '',
    price: 0,
    color: ''
  };
 */
  @Input() sneaker!: Sneakers; 
  @Output() addToCart = new EventEmitter<Sneakers>();  // Emite el sneaker seleccionado para el carrito
  userRole: any;


  authService = inject(AuthService);
  ngOnInit(): void {
    this.userRole = this.authService.getRoleFromToken();

  }

  onAddToCart() {
    this.addToCart.emit(this.sneaker);  // Emite el sneaker específico cuando se hace clic en el botón
  }
  
  isUser():boolean{
    if(this.userRole){
      return true;
    }
    return false;
  }


  visible: boolean = false;

    showDialog() {  
        this.visible = true;
    }

  sidebarVisible: boolean = false;
  isModalVisible: boolean = false;

  // Método para abrir el modal
  openModal(): void {
    this.isModalVisible = true;
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.isModalVisible = false;
  }

  

}
