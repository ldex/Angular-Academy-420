import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ContactComponent } from './shared/contact.component';
import { AdminComponent } from './shared/admin.component';
import { ErrorComponent } from './shared/error.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, title: 'Home Page' },
    { path: 'products', component: ProductListComponent, title: 'Products Page' },
    { path: 'contact', component: ContactComponent, title: 'Contact' },
    { path: 'admin', component: AdminComponent, title: 'Administration' },
    { path: '**', component: ErrorComponent }
];
