import { Component, inject, Input } from '@angular/core';
import { Posts } from '../../interfaces/post';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [NgIf, FormsModule, DialogModule, ButtonModule, InputTextModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  @Input() post!: Posts;

  authService = inject(AuthService);
  postService = inject(PostService);

  editModalVisible: boolean = false;

  editedPost = {
    content: '',
    image: '',
  };

  isUserPost(): boolean {
    const currentUser = this.authService.getCurrentUser();
    return currentUser === this.post.username; 
  }

  startEdit(post: Posts): void {
    this.editModalVisible = true;
    this.editedPost.content = post.content;
    this.editedPost.image = post.image;
  }

  closeEditModal(): void {
    this.editModalVisible = false;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.editedPost.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  updatePost(): void {
    if (this.post._id) {
      this.postService.updatePost(this.post._id, this.editedPost);
      this.closeEditModal(); // Cierra el modal al terminar
    }
  }

  deletePost(postId: string): void {
    if (confirm('¿Estás seguro de eliminar este post?')) {
      this.postService.deletePost(postId);
    }
  }
}
