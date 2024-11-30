import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sneakers } from '../../interfaces/sneakers';
import { SneakerServiceService } from '../../services/sneaker-service.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-sneakers-db-view',
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './sneakers-db-view.component.html',
  styleUrls: ['./sneakers-db-view.component.css']
})
export class SneakersDBViewComponent {

  // Controla la visibilidad del modal de edición y creación
  editModalVisible: boolean = false;
  createModalVisible: boolean = false;

  openEditModal(sneaker: any) {
    // Rellenar el objeto `editedSneaker` con los datos del sneaker seleccionado
    this.editedSneaker = { ...sneaker };
    this.editModalVisible = true; // Mostrar el modal
  }

  // Datos editados y nuevos
  editedSneaker: Sneakers = {
    quantity: 0,
    brandName: '',
    name: '',
    description: '',
    image: '',
    price: 0,
    color: '',
    sizeRange: []
  };

  newSneaker: Sneakers = {
    quantity: 0,
    brandName: '',
    name: '',
    description: '',
    image: '',
    price: 0,
    color: '',
    sizeRange: []
  };

  private SneakersService = inject(SneakerServiceService);

  constructor() {
    this.SneakersService.fetchSneakers();
  }

  public get sneakers(): Sneakers[] {
    return this.SneakersService.sneakers;
  }

  ngOnInit(): void {
    this.SneakersService.fetchSneakers();
  }

  // Mostrar el modal para agregar un nuevo sneaker
  showCreateDialog() {
    this.createModalVisible = true;
  }

  // Cerrar el modal de creación
  cancelCreateSneaker(): void {
    this.createModalVisible = false;
    this.resetNewSneakerForm(); // Limpiar el formulario
  }

  // Mostrar el modal para editar un sneaker
  startEdit(sneaker: Sneakers): void {
    this.editModalVisible = true;
    this.editedSneaker = { ...sneaker }; // Asignar los datos del sneaker a 'editedSneaker'
  }

  // Cerrar el modal de edición
  closeEditModal(): void {
    this.editModalVisible = false;
  }

  // Actualizar sneaker
  updateSneaker(): void {
    if (this.editedSneaker.name) { // Verificamos que haya un nombre para actualizar
      const sneakerId = this.editedSneaker._id; // O usa el id del sneaker
      this.SneakersService.updateSneaker(sneakerId!, this.editedSneaker); // Actualizar sneaker usando el id
      this.closeEditModal();
    } else {
      console.log('No se pudo encontrar el sneaker.');
    }
  }

  convertSizeRange(value: string): number[] {
    return value.split(',').map(num => parseInt(num.trim(), 10)); // Convierte a array de números
  }
  

  // Crear un nuevo sneaker
  createSneaker(): void {
    if (this.newSneaker.name && this.newSneaker.brandName && this.newSneaker.price > 0 && this.newSneaker.sizeRange.length > 0) {
      // Si el sizeRange es una cadena, lo convertimos a un array de números
      if (typeof this.newSneaker.sizeRange === 'string') {
        this.newSneaker.sizeRange = this.convertSizeRange(this.newSneaker.sizeRange);
      }
      this.SneakersService.createSneaker(this.newSneaker);
      this.resetNewSneakerForm(); 
      this.cancelCreateSneaker(); 
    } else {
      console.log('Completa todos los campos antes de continuar');
    }
  }
  

  // Eliminar sneaker
  deleteSneaker(sneakerID: string): void {
    if (confirm('¿Estás seguro de eliminar este sneaker?')) {
      this.SneakersService.deleteSneaker(sneakerID);
    }
  }

  // Resetear el formulario de crear sneaker
  resetNewSneakerForm(): void {
    this.newSneaker = {
      quantity: 0,
      brandName: '',
      name: '',
      description: '',
      image: '',
      price: 0,
      color: '',
      sizeRange: []
    };
  }

  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
      this.convertToBase64(this.selectedFile);
    }
  }

  // Convierte la imagen a Base64
  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.newSneaker.image = reader.result as string;  // Asignamos la imagen en Base64 al modelo
    };
    reader.readAsDataURL(file);
  }
}
