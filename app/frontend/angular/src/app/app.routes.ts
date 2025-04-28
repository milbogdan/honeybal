import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminProductsPageComponent } from './pages/admin-page/admin-products-page/admin-products-page.component';
import { ViewCartPageComponent } from './pages/view-cart-page/view-cart-page.component';
import { loginGuard } from './guards/login.guard';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { AboutPageComponent } from './pages/about-page/about-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'profile', component: ProfilePageComponent, canActivate: [authGuard] },
    { path: 'products', component: ProductsPageComponent },
    { path: 'login', component: LoginPageComponent, canActivate: [loginGuard] },
    { path: 'register', component: RegisterPageComponent, canActivate: [loginGuard] }, 
    { path: 'cart', component: ViewCartPageComponent }, 
    { path: 'product/:id', component: ProductDetailPageComponent },
    { path: 'admin', component: AdminPageComponent, canActivate:[adminGuard], children: [
            { path: 'products', component: AdminProductsPageComponent }
        ]
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
