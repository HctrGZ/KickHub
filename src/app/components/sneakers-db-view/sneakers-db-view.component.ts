import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sneakers } from '../../interfaces/sneakers';
import { SneakerServiceService } from '../../services/sneaker-service.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-sneakers-db-view',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './sneakers-db-view.component.html',
  styleUrl: './sneakers-db-view.component.css'
})
export class SneakersDBViewComponent {
  sneaker: Sneakers[] = [];


  private SneakersService = inject(SneakerServiceService);

  constructor(){
    this.SneakersService.fetchSneakers();
  }

  public get sneakers(): Sneakers[]{
    return this.SneakersService.sneakers;
  }  

  ngOnInit(): void {
    this.SneakersService.fetchSneakers();
    this.sneaker = this.SneakersService.sneakers;
  }
}
