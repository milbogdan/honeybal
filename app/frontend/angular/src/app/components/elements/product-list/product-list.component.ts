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
  products : Product[] = [];
  productService: ProductService = inject(ProductService);

  ngOnInit(){
    this.productService.getAllProducts(0,7).subscribe({
      next: (data : any) => {
        // console.log(data);
        this.products = data.content;
      },
      error: (err : any) => {
        // console.log(err);
      }
    })
  }

}