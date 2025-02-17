import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../models/Product';
import { ProductService } from '../../../services/product.service';
import { FilterService } from '../../../services/filter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, OnDestroy {
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

  ngOnInit(){
    this.filterSubscription = this.filterService.filter$.subscribe((filters) => {
      this.currentFillters = filters;
      console.log(this.currentFillters);
      this.fetchProducts(this.currentPage, this.rows, this.currentFillters);
    })
  }

  onPageChange(event: any) {
      this.first = event.first ?? 0;
      this.rows = event.rows ?? 5;
      this.currentPage = (this.first / this.rows);
      this.fetchProducts(this.currentPage, this.rows, this.currentFillters);
  }

  private fetchProducts(currentPage : number, pageSize: number, filters: any){
    this.productService.getAllProducts(currentPage, pageSize, filters).subscribe({
      next: (data : any) => {
        // console.log(data);
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.products = data.content;
      },
      error: (err : any) => {
        // console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }
}