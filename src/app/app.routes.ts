import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home.component';
import { ContactComponent } from './shared/contact.component';
import { AdminComponent } from './shared/admin.component';
import { ErrorComponent } from './shared/error.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductInsertComponent } from './products/product-insert/product-insert.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, title: 'Home Page' },
    { path: 'products', children: [
        { path: '', loadComponent: () =>
                    import('./products/product-list/product-list.component')
                    .then(r => r.ProductListComponent),
            title: 'Products Page' },
        { path: 'insert', component: ProductInsertComponent },
        { path :':id', component: ProductDetailComponent }
    ]},
    { path: 'contact', component: ContactComponent, title: 'Contact' },
    { path: 'admin', component: AdminComponent, title: 'Administration' },
    { path: '**', component: ErrorComponent }
];
