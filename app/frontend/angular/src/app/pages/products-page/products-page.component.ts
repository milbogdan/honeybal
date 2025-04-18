import { Component, HostListener, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ViewChangeComponent } from '../../components/view-change/view-change.component';
import { ProductFilterComponent } from '../../components/product-filter/product-filter.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { NgIf } from '@angular/common';
import { AccountService } from '../../services/account.service';
import { BehaviorSubject } from 'rxjs';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-page',
  imports: [ NavbarComponent, ProductListComponent, ViewChangeComponent, ProductFilterComponent, SearchBarComponent, LoaderComponent, NgIf, FooterComponent ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent {
  isMobile = false;

  accountService : AccountService = inject(AccountService);
  productService : ProductService = inject(ProductService);

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth < 768;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (typeof window !== 'undefined') {
      this.isMobile = event.target.innerWidth < 768;
    }
  }
}
