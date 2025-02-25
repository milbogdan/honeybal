import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminProductsPageComponent } from './pages/admin-page/admin-products-page/admin-products-page.component';
import { ViewCartPageComponent } from './pages/view-cart-page/view-cart-page.component';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'home', component: HomePageComponent },
    { path: 'products', component: ProductsPageComponent },
    { path: 'login', component: LoginPageComponent, canActivate: [loginGuard] },
    { path: 'register', component: RegisterPageComponent }, 
    { path: 'cart', component: ViewCartPageComponent }, 
    { path: 'admin', component: AdminPageComponent, children: [
            { path: 'products', component: AdminProductsPageComponent }
        ]
    },
    { path: '**', component: HomePageComponent}
];
