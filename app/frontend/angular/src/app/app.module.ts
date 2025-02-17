import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginContainerComponent } from './components/elements/login-container/login-container.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// PrimeNg
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RegisterContainerComponent } from './components/elements/register-container/register-container.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavbarComponent } from './components/elements/navbar/navbar.component';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { Ripple } from 'primeng/ripple';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductListComponent } from './components/elements/product-list/product-list.component';
import { ProductComponent } from './components/elements/product/product.component';
import { PaginatorModule } from 'primeng/paginator';
import { ProductFilterComponent } from './components/elements/product-filter/product-filter.component';
import { PanelModule } from 'primeng/panel';
import { SearchBarComponent } from './components/elements/search-bar/search-bar.component';
import { ViewChangeComponent } from './components/elements/view-change/view-change.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginContainerComponent,
    RegisterPageComponent,
    RegisterContainerComponent,
    HomePageComponent,
    NavbarComponent,
    ProductsPageComponent,
    ProductListComponent,
    ProductComponent,
    ProductFilterComponent,
    SearchBarComponent,
    ViewChangeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    ButtonModule,
    CheckboxModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    CommonModule,
    Ripple,
    Menubar,
    PaginatorModule,
    PanelModule,
    TableModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideClientHydration(withEventReplay()),
    providePrimeNG({
      theme: {
      preset: Aura,
      options: {
        darkModeSelector: '.darkmode',
      },
      },
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
