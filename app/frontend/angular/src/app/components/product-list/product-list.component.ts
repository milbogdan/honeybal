import { Component, inject, Input } from '@angular/core';
import { NgFor, NgTemplateOutlet } from '@angular/common';
import { Product } from '../../models/product.interface';
import { VariationProducts } from '../../models/variationProducts.interface';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ProductService } from '../../services/product.service';
import { FilterService } from '../../services/filter.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'product-list',
  imports: [ TableModule, NgFor, PaginatorModule, ProductComponent, NgTemplateOutlet ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  first: number = 0;
  rows: number = 6;
  currentPage : number = 0;
  products : Product[] = [];
  totalElements : number = 0;
  totalPages : number = 0;  
  productService: ProductService = inject(ProductService);
  currentFillters: any = {};
  filterService : FilterService = inject(FilterService);
  filterSubscription!: Subscription;
  @Input() loadingSubject!: BehaviorSubject<boolean>;

  ngOnInit(){
    this.filterSubscription = this.filterService.filter$.subscribe((filters) => {
      this.currentFillters = filters;
      this.fetchProducts(this.currentPage, this.rows, this.currentFillters);
    });
  }

  onPageChange(event: any) {
      this.first = event.first ?? 0;
      this.rows = event.rows ?? 5;
      this.currentPage = (this.first / this.rows);
      this.fetchProducts(this.currentPage, this.rows, this.currentFillters);
  }

  private fetchProducts(currentPage : number, pageSize: number, filters: any){
    this.loadingSubject.next(true);

    this.productService.getAllProducts(currentPage, pageSize, filters).subscribe({
      next: (data : any) => {
        this.totalElements = data.totalElements;  
        this.totalPages = data.totalPages;
        this.products = data.content;

        if(filters.inStock != null){
          this.products = data.content.map((product : Product) => {
            const filteredVariations = product.variations.filter((variation : VariationProducts) => variation.in_stock === filters.inStock);
            return { ...product, variations: filteredVariations };
          }).filter((product : Product) => product.variations.length > 0);
        }

        this.loadingSubject.next(false);
      },
      error: (err : any) => {
        // console.log(err);
        this.loadingSubject.next(false);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }
}
