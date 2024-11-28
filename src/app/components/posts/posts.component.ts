import { Component, inject } from '@angular/core';
import { PostCardComponent } from "../post-card/post-card.component";
import { PostService } from '../../services/post.service';
import { Posts } from '../../interfaces/post';
import { NgFor } from '@angular/common';
import { Header1Component } from "../header1/header1.component";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [PostCardComponent, NgFor, Header1Component],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  private PostServ = inject(PostService);

  constructor(){
    this.PostServ.fetchPosts();
  }

  public get posts(): Posts[]{
    return this.PostServ.posts;
  }  
}