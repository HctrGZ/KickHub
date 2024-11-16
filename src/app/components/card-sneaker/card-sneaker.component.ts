import { ChangeDetectorRef, Component, Input  } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Sneakers } from '../../interfaces/sneakers';
import { DialogModule } from 'primeng/dialog';
import { NgClass } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { DividerModule } from 'primeng/divider';


@Component({
  selector: 'app-card-sneaker',
  standalone: true,
  imports: [CardModule, ButtonModule, DialogModule,NgClass, SidebarModule,DividerModule],
  templateUrl: './card-sneaker.component.html',
  styleUrl: './card-sneaker.component.css'
})

export class CardSneakerComponent {
  @Input()
  public sneaker: Sneakers = {
    name: '',
    description: '',
    image: '',
    size: 0
  };

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
