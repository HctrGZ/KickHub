import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShowGalleryComponent } from './components/show-gallery/show-gallery.component';
import { LoginComponent } from './components/login/login.component';
import { PostsComponent } from './components/posts/posts.component';
import { UsersComponent } from './components/users/users.component';
import { SneakersDBViewComponent } from './components/sneakers-db-view/sneakers-db-view.component';

export const routes: Routes = [
    {path: "", redirectTo: "home", pathMatch: "full"},
    {path: "home", component: HomeComponent},
    {path: "gallery", component: ShowGalleryComponent},
    {path: "login", component: LoginComponent},
    {path: "posts", component: PostsComponent},
    {path: "users", component: UsersComponent},
    {path: "sneakersDB", component: SneakersDBViewComponent},
    /* {path: "not-found", component: NotFoundComponent}, */
    /* {path: "**", redirectTo: "not-found", pathMatch:"full"} */
];
