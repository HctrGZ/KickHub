import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Users } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  @Input() user!: Users;
  // Controla la visibilidad del modal de edición
  editModalVisible: boolean = false;
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  // Datos editados
  editedUser: Users = {
    username: '',
    password: '',
    role: '',
  };

  newUser: Users = {
    username: '',
    password: '',
    role: '',
  };

  private UserServ = inject(UserService);

  constructor() {
    this.UserServ.fetchUsers();
  }

  public get users(): Users[] {
    return this.UserServ.users;
  }

  ngOnInit(): void {
    this.UserServ.fetchUsers();
  }

  // Eliminar usuario
  deleteUser(userID: string): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.UserServ.deleteUser(userID);
    }
  }

  // Iniciar edición de un usuario
  startEdit(user: Users): void {
    this.editModalVisible = true;
    // Asignamos todo el objeto 'user' que incluye '_id'
    this.editedUser = { ...user };
  }

  // Cerrar modal de edición
  closeEditModal(): void {
    this.editModalVisible = false;
  }

  // Actualizar usuario
  updateUser(): void {
    if (this.editedUser._id) {
      // Verificamos si '_id' está presente
      this.UserServ.updateUser(this.editedUser._id, this.editedUser); // Usamos '_id' para actualizar
      this.closeEditModal(); // Cierra el modal después de la actualización
    } else {
      console.log('No se pudo encontrar el ID del usuario.');
    }
  }

  createUser(): void {
    if (this.newUser.username && this.newUser.password && this.newUser.role) {
      this.UserServ.createUser(this.newUser); // Llama al servicio para crear el post
      // Limpia el formulario después de crear el post
      this.resetUserForm();
    } else {
      console.log('Completa todos los campos antes de continuar');
    }
  }

  resetUserForm(): void {
    this.newUser = {
      username: '',
      password: '',
      role: '',
    };
  }
  cancelPost(): void {
    this.visible = false;  // Cierra el modal
    this.resetUserForm();  // Limpia el formulario completamente
  }
}
