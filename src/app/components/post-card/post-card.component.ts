import { Component, Input } from '@angular/core';
import { Posts } from '../../interfaces/post';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {
  @Input()
  public post: Posts = {
    username: '',
    content: '',
    image: '',
    likes: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  

}
