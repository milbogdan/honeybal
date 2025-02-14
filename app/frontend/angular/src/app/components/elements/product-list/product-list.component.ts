import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../models/Product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  first: number = 0;
  rows: number = 6;
  currentPage : number = 0;
  products : Product[] = [];
  totalElements : number = 0;
  totalPages : number = 0;  
  productService: ProductService = inject(ProductService);

  ngOnInit(){
    this.fetchProducts(this.currentPage, this.rows);
  }

  onPageChange(event: any) {
      this.first = event.first ?? 0;
      this.rows = event.rows ?? 5;
      this.currentPage = (this.first / this.rows);
      this.fetchProducts(this.currentPage, this.rows);
      console.log(this.currentPage, this.rows);
  }

  private fetchProducts(currentPage : number, pageSize: number){
    this.productService.getAllProducts(currentPage, pageSize).subscribe({
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
}