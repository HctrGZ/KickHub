import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShowGalleryComponent } from './components/show-gallery/show-gallery.component';

export const routes: Routes = [
    {path: "", redirectTo: "home", pathMatch: "full"},
    {path: "home", component: HomeComponent},
    {path: "gallery", component: ShowGalleryComponent},
    /* {path: "not-found", component: NotFoundComponent}, */
    /* {path: "**", redirectTo: "not-found", pathMatch:"full"} */
];
