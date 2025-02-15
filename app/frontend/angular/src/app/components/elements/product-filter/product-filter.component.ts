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
  selectedCategories: ProductCategory[] = [];
  categoryService : ProductCategoryService = inject(ProductCategoryService);
  filterService : FilterService = inject(FilterService);
  
  ngOnInit(){
    this.categories = this.categoryService.categories;
  }

  onCategoryChange(category: ProductCategory, event: any) {
    if (event.target.checked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    }
    this.updateFilters();
    console.log(this.selectedCategories);
  }

  onStockChange(value: boolean | null) {
    console.log(this.inStock);
    this.inStock = value;
    this.updateFilters();
  }

  updateFilters() {
    this.filterService.updateFilters({
      categories: this.selectedCategories,
      inStock: this.inStock
    });
  }
}
