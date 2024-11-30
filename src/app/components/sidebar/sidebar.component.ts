import { NgIf, NgStyle } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule, RouterLink, NgStyle, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})  
export class SidebarComponent {
  loggedInUser: string | undefined;
  userRole: string | null | undefined

  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();  // Llama al método de cierre de sesión
  }

  ngOnInit(): void {
    this.userRole = this.authService.getRoleFromToken();
    const username = localStorage.getItem('username');
    if (username) {
      this.loggedInUser = username;
    }
  }

  isAdmin(): boolean {
    if(this.userRole == 'admin'){
      return true;
    }
    return false;
  }

  isUser(): boolean {
    if(this.userRole == 'user'){
      return true;
    }
    return false;
  }

  
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  @Input() sidebarVisible: boolean = false; // Manejar el estado desde el componente padre.
  @Output() sidebarVisibleChange = new EventEmitter<boolean>(); // Notifica cambios del estado al padre.

  closeSidebar(): void {
    this.sidebarVisible = false; // Cierra el sidebar localmente.
    this.sidebarVisibleChange.emit(this.sidebarVisible); // Notifica al padre.
  }
}
