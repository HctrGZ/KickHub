import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { Header1Component } from "../header1/header1.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, Header1Component, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
