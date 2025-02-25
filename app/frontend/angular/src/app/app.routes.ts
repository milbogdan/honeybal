import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { authGuard } from './guards/auth.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';

export const routes: Routes = [
    // { path: '', component: HomePageComponent },
    { path: 'home', component: HomePageComponent, canActivate: [authGuard] },
    { path: 'products', component: ProductsPageComponent },
    { path: 'login', component: LoginPageComponent},
    { path: 'register', component: RegisterPageComponent }, 
    // { path: 'cart', component: ViewCartPageComponent }, 
    // { path: 'admin', component: AdminPageComponent, canActivate: [adminGuard], children: [
    //     { path: 'products', component: AdminProductsPageComponent }
    //     ]
    // },
    // { path: '**', component: HomePageComponent}
];
