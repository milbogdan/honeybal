import { Component, inject } from '@angular/core';
import { ProductCategoryService } from '../../../services/productCategory.service';
import { ProductCategory } from '../../../models/ProductCategory';

@Component({
  selector: 'product-filter',
  standalone: false,
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent {
  categories : ProductCategory[] = [];
  categoryService : ProductCategoryService = inject(ProductCategoryService);
  
  ngOnInit(){
    this.categories = this.categoryService.categories;
  }
}
