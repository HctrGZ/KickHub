import { Component, inject, Input } from '@angular/core';
import { PostCardComponent } from '../post-card/post-card.component';
import { PostService } from '../../services/post.service';
import { Posts } from '../../interfaces/post';
import { NgFor } from '@angular/common';
import { Header1Component } from '../header1/header1.component';
import { FormsModule, NgModel } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    PostCardComponent,
    NgFor,
    Header1Component,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  private PostServ = inject(PostService);

  @Input()
  public newPost: Posts = {
    username: 'default',
    content: '',
    image: '',
    likes: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  constructor() {
    this.PostServ.fetchPosts();
  }

  get posts(): Posts[] {
    return this.PostServ.posts.slice().reverse();
  }

  createPost(): void {
    if (this.newPost.username && this.newPost.content && this.newPost.image) {
      this.PostServ.createPost(this.newPost);

      this.resetPostForm();
    } else {
      console.log('Completa todos los campos antes de continuar');
    }
  }

  resetPostForm(): void {
    this.newPost = {
      username: 'default',
      content: '',
      image: '',
      likes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  cancelPost(): void {
    this.visible = false;
    this.resetPostForm();
  }

  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
      this.convertToBase64(this.selectedFile);
    }
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.newPost.image = reader.result as string; // Asignamos la cadena Base64 a la propiedad `image`
    };
    reader.readAsDataURL(file); // Convierte el archivo a Base64
  }
}
