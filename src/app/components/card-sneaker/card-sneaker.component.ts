import { ChangeDetectorRef, Component, Input  } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Sneakers } from '../../interfaces/sneakers';
import { DialogModule } from 'primeng/dialog';
import { NgClass } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-card-sneaker',
  standalone: true,
  imports: [CardModule, ButtonModule, DialogModule,NgClass, SidebarModule],
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

  sidebarVisible: boolean = false;
  constructor(private cd: ChangeDetectorRef) { } 
  showDialog() { this.visible = true; this.cd.detectChanges(); }
  visible: boolean = false;

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
