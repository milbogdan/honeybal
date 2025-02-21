import { Component, inject } from '@angular/core';
import { ProductCategoryService } from '../../../services/productCategory.service';
import { ProductCategory } from '../../../models/ProductCategory';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: 'product-filter',
  standalone: false,
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent {
  categories : ProductCategory[] = [];
  inStock: boolean | null = null;
  categoryIds: number[] = [];
  categoryService : ProductCategoryService = inject(ProductCategoryService);
  filterService : FilterService = inject(FilterService);
  
  ngOnInit(){
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      }
    });
  }

  onCategoryChange(category: ProductCategory, event: any) {
    if (event.target.checked) {
      this.categoryIds.push(category.id);
    } else {
      this.categoryIds = this.categoryIds.filter(c => c !== category.id);
    }
    this.updateFilters();
  }

  onStockChange(value: boolean | null) {
    this.inStock = value;
    this.updateFilters();
  }

  updateFilters() {
    this.filterService.updateFilters({
      categoryIds: this.categoryIds,
      inStock: this.inStock
    });
  }
}
