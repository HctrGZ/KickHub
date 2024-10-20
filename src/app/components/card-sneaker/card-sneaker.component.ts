import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Sneakers } from '../../interfaces/sneakers';

@Component({
  selector: 'app-card-sneaker',
  standalone: true,
  imports: [CardModule, ButtonModule],
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
}
