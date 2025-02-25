import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ViewChangeComponent } from '../../components/view-change/view-change.component';
import { ProductFilterComponent } from '../../components/product-filter/product-filter.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-products-page',
  imports: [ NavbarComponent, ProductListComponent, ViewChangeComponent, ProductFilterComponent, SearchBarComponent ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent {
  isMobile = false;

  constructor() {}

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
