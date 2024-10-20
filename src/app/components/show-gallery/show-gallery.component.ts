import { Component } from '@angular/core';
import { CardSneakerComponent } from "../card-sneaker/card-sneaker.component";
import { Header1Component } from "../header1/header1.component";
import { CardModule } from 'primeng/card';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-show-gallery',
  standalone: true,
  imports: [CardSneakerComponent, Header1Component, CardModule, NgFor],
  templateUrl: './show-gallery.component.html',
  styleUrl: './show-gallery.component.css'
})
export class ShowGalleryComponent {
  

}
