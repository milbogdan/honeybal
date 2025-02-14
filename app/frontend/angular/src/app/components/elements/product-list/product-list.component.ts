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
  rows: number = 5;
  products : Product[] = [];
  productService: ProductService = inject(ProductService);

  ngOnInit(){
    this.fetchProducts();    
  }

  onPageChange(event: any) {
      this.first = event.first ?? 0;
      this.rows = event.rows ?? 5;
      this.fetchProducts();
  }

  private fetchProducts(){
    this.productService.getAllProducts(this.first, this.rows).subscribe({
      next: (data : any) => {
        // console.log(data);
        this.products = data.content;
      },
      error: (err : any) => {
        // console.log(err);
      }
    });
  }
}