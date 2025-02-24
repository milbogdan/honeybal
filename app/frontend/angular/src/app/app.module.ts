import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginContainerComponent } from './components/elements/login-container/login-container.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CartSidebarComponent } from './components/elements/cart-sidebar/cart-sidebar.component';
import { AddCategoryComponent } from './components/elements/add-category/add-category.component';
import { ProductDialogComponent } from './components/elements/product-dialog/product-dialog.component';
import { AddNewProductComponent } from './components/elements/add-new-product/add-new-product.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { SidenavComponent } from './components/elements/sidenav/sidenav.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RegisterContainerComponent } from './components/elements/register-container/register-container.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavbarComponent } from './components/elements/navbar/navbar.component';
import { AdminProductsPageComponent } from './pages/admin-page/admin-products-page/admin-products-page.component';
import { SearchBarComponent } from './components/elements/search-bar/search-bar.component';
import { ViewChangeComponent } from './components/elements/view-change/view-change.component';
import { ProductFilterComponent } from './components/elements/product-filter/product-filter.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductListComponent } from './components/elements/product-list/product-list.component';
import { ProductComponent } from './components/elements/product/product.component';

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
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { Ripple } from 'primeng/ripple';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { FileUpload } from 'primeng/fileupload';
import { IconFieldModule } from 'primeng/iconfield';
import { ToolbarModule } from 'primeng/toolbar';
import { InputIconModule } from 'primeng/inputicon';
import { Tag } from 'primeng/tag';
import { Dialog } from 'primeng/dialog';
import { ConfirmDialog } from 'primeng/confirmdialog'
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { TextareaModule } from 'primeng/textarea';
import { RadioButton } from 'primeng/radiobutton';
import { InputNumber } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SelectButton } from 'primeng/selectbutton';
import { DrawerModule } from 'primeng/drawer';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { ViewCartPageComponent } from './pages/view-cart-page/view-cart-page.component';
import { StepsModule } from 'primeng/steps';

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
    AdminPageComponent,
    SidenavComponent,
    AdminProductsPageComponent,
    ProductDialogComponent,
    AddCategoryComponent,
    AddNewProductComponent,
    CartSidebarComponent,
    ViewCartPageComponent
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
    TableModule,
    FileUpload,
    IconFieldModule,
    ToolbarModule,
    InputIconModule,
    Tag,
    Dialog,
    ConfirmDialog,
    DynamicDialogModule,
    InputNumber,
    RadioButton,
    TextareaModule,
    ToastModule,
    DropdownModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    SelectButton,
    DrawerModule,
    AnimateOnScrollModule,
    StepsModule
  ],
  providers: [
    DialogService,
    MessageService,
    DynamicDialogRef,
    ConfirmationService,
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
