import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Product } from '../../models/product.interface';
import { VariationProducts } from '../../models/variationProducts.interface';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FavoriteProductService } from '../../services/favorite-product.service';

@Component({
  selector: 'product',
  imports: [ CommonModule, RouterModule ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product! : Product;
  selectedVariation : VariationProducts | null = null;
  quantity : number = 1;
  @Input() isFavorite?: boolean;
  @Output() favoriteChanged = new EventEmitter<Product>();

  cartService : CartService = inject(CartService);
  router : Router = inject(Router);
  favoriteProductService : FavoriteProductService = inject(FavoriteProductService);

  ngOnInit(){
    this.getInStockItem();
  }

  toggleFavorite() {
    if (!this.selectedVariation) return;
    const updatedProduct = { ...this.product };
  
    if (!this.selectedVariation.isFavorite) {
      this.favoriteProductService.addProductToFavorite(this.selectedVariation.id).subscribe({
        next: () => {
          this.isFavorite = true;
          
          updatedProduct.variations = updatedProduct.variations.map(variation => {
            if (variation.id === this.selectedVariation?.id) {
              variation.isFavorite = true;
            }
            return variation;
          });
          this.favoriteChanged.emit(updatedProduct);
        },
        error: () => {
          console.error('Neuspešno dodavanje u favorite');
        }
      });
    } else {
      if (this.selectedVariation?.wishId) {
        this.favoriteProductService.removeProductFromFavorite(this.selectedVariation.wishId).subscribe({
          next: () => {
            this.isFavorite = false;
            updatedProduct.variations = updatedProduct.variations.map(variation => {
              if (variation.id === this.selectedVariation?.id) {
                variation.isFavorite = false;
              }
              return variation;
            });
            this.favoriteChanged.emit(updatedProduct);
          },
          error: () => {
            console.error('Neuspešno uklanjanje iz favorita');
          }
        });
      }
    }
  }  

  getInStockItem(){
    this.selectedVariation = this.product.variations.find(variation => variation.in_stock === true || variation.in_stock === false)  || null;
    
    return this.selectedVariation;  
  }

  onSelectVariation(variation: VariationProducts | null) {
    if (variation?.in_stock !== true && this.product.variations.length == 1) return;
  
    this.selectedVariation = variation;
  }

  increaseQuantity(){
    this.quantity++;
  }

  decreaseQuantity(){
    if(this.quantity > 1)
      this.quantity--;
  }

  addToCart(product : Product, quantity : number){
    let data = { 
      productId : product.id,
      productName : product.name,
      catergyName : product.category.name,
      variationId : this.selectedVariation?.id,
      variationSize : this.selectedVariation?.size,
      variationImageUrl : this.selectedVariation?.imageUrl,
      variationBasePrice : this.selectedVariation?.basePrice,
      variationPrice : this.selectedVariation?.price,
      variationDiscount : this.selectedVariation?.discount,
      variationInStock : this.selectedVariation?.in_stock,
      variationQuantity : quantity
    };

    if(data.variationInStock === true){
      this.cartService.updateCart(data);
    } 
    else{
      alert('This item is out of stock');
      return;
    }
  }

  showProductDetail(product : Product) {
    let selectedVariation = {
      productId : product.id,
      productName : product.name,
      catergyName : product.category.name,
      variationId : this.selectedVariation?.id,
      variationSize : this.selectedVariation?.size,
      variationImageUrl : this.selectedVariation?.imageUrl,
      variationBasePrice : this.selectedVariation?.basePrice,
      variationPrice : this.selectedVariation?.price,
      variationDiscount : this.selectedVariation?.discount,
      variationInStock : this.selectedVariation?.in_stock,
    };

    let data = {
      selectedVariation,
      product 
    };
    
    this.router.navigate(['/product', this.selectedVariation!.id], { state: data });
  }
}
