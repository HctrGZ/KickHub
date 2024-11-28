import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule, RouterLink, NgStyle],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})  
export class SidebarComponent {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  @Input() sidebarVisible: boolean = false; // Manejar el estado desde el componente padre.
  @Output() sidebarVisibleChange = new EventEmitter<boolean>(); // Notifica cambios del estado al padre.

  closeSidebar(): void {
    this.sidebarVisible = false; // Cierra el sidebar localmente.
    this.sidebarVisibleChange.emit(this.sidebarVisible); // Notifica al padre.
  }
}
