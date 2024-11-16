import { Sneakers } from './../../interfaces/sneakers';
import { Component, inject } from '@angular/core';
import { CardSneakerComponent } from "../card-sneaker/card-sneaker.component";
import { Header1Component } from "../header1/header1.component";
import { NgFor } from '@angular/common';
import { SneakerServiceService } from '../../services/sneaker-service.service';

@Component({
  selector: 'app-show-gallery',
  standalone: true,
  imports: [CardSneakerComponent, Header1Component, NgFor ],
  templateUrl: './show-gallery.component.html',
  styleUrl: './show-gallery.component.css'
})
export class ShowGalleryComponent {

  private SneakersService = inject(SneakerServiceService);

  constructor(){
    this.SneakersService.fetchSneakers();
  }

  public get sneakers(): Sneakers[]{
    return this.SneakersService.sneakers;
  }  
}

