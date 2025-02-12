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
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { Ripple } from 'primeng/ripple';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginContainerComponent,
    RegisterPageComponent,
    RegisterContainerComponent,
    HomePageComponent,
    NavbarComponent
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
    Menubar
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
