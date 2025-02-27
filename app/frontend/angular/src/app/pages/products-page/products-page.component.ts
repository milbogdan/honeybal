import { Component, HostListener, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ViewChangeComponent } from '../../components/view-change/view-change.component';
import { ProductFilterComponent } from '../../components/product-filter/product-filter.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { NgIf } from '@angular/common';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-products-page',
  imports: [ NavbarComponent, ProductListComponent, ViewChangeComponent, ProductFilterComponent, SearchBarComponent, LoaderComponent, NgIf ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent {
  isMobile = false;
  loading : boolean = true;
  accountService : AccountService = inject(AccountService);

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth < 768;
    }

    this.accountService.getUser().subscribe({
      next: () => this.loading = false,
      error: () => this.loading = false
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (typeof window !== 'undefined') {
      this.isMobile = event.target.innerWidth < 768;
    }
  }
}
