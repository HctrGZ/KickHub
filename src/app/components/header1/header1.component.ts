import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-header1',
  standalone: true,
  imports: [SidebarModule,ButtonModule],
  templateUrl: './header1.component.html',
  styleUrl: './header1.component.css'
})
export class Header1Component {
  sidebarVisible: boolean = false;
}
