import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Product } from '../../models/product.interface';
import { VariationProducts } from '../../models/variationProducts.interface';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ProductService } from '../../services/product.service';
import { FilterService } from '../../services/filter.service';
import { Subscription } from 'rxjs';
import { ProductComponent } from '../product/product.component';
import { FavoriteProductService } from '../../services/favorite-product.service';

@Component({
  selector: 'product-list',
  imports: [ TableModule, NgFor, PaginatorModule, ProductComponent, CommonModule ],
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
  currentFillters: any = {};
  filterSubscription!: Subscription;
  selectedVariations: Map<number, VariationProducts> = new Map();
  favoriteProductIds: number[] = [];

  productService: ProductService = inject(ProductService);
  filterService : FilterService = inject(FilterService);
  favoriteProductsService : FavoriteProductService = inject(FavoriteProductService);

  ngOnInit(){
    this.filterSubscription = this.filterService.filter$.subscribe((filters) => {
      this.currentFillters = filters;
      this.fetchProducts(this.currentPage, this.rows, this.currentFillters);
      this.fetchFavoriteProducts(this.currentPage, this.rows);
    });
  }

  onPageChange(event: any) {
      this.first = event.first ?? 0;
      this.rows = event.rows ?? 5;
      this.currentPage = (this.first / this.rows);
      this.fetchProducts(this.currentPage, this.rows, this.currentFillters);
      this.fetchFavoriteProducts(this.currentPage, this.rows);
  }

  private fetchFavoriteProducts(currentPage : number, pageSize: number) {
    this.favoriteProductsService.getFavoriteProducts(currentPage, pageSize).subscribe({
      next: (response: any) => {
        this.favoriteProductIds = response.content.map((fav : any) => fav.id);
        console.log(this.favoriteProductIds);
      }
    });
  }

  private fetchProducts(currentPage : number, pageSize: number, filters: any){
    this.productService.loading = true;

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

        // this.loadingSubject.next(false);
        this.productService.loading = false;
      },
      error: (err : any) => {
        // console.log(err);
        // this.loadingSubject.next(false);
        this.productService.loading = false;
      }
    });
  }

  selectVariation(product: Product, variation : VariationProducts) {
    this.selectedVariations.set(product.id, variation);
  }

  getSelectedVariation(productId: number): VariationProducts | null {
    return this.selectedVariations.get(productId) ?? null;
  }

  getFavoritesMap(product: Product): Map<number, number[]> {
    const favoritesMap = new Map<number, number[]>();
    // console.log(this.favoriteProductIds)

    const favoriteIds = product.variations
      .filter(variation => this.favoriteProductIds.includes(variation.id))
      .map(variation => variation.id);
    console.log("!: ", favoriteIds);
  
    favoritesMap.set(product.id, favoriteIds);
  
    return favoritesMap;
  }

  ngOnDestroy(): void {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }
}
