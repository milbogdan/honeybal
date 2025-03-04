import { Component, inject, Input } from '@angular/core';
import { Product } from '../../models/product.interface';
import { VariationProducts } from '../../models/variationProducts.interface';
import { CartService } from '../../services/cart.service';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'product',
  imports: [ NgClass, NgFor, NgStyle, NgIf, RouterModule ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product! : Product;
  selectedVariation : VariationProducts | null = null;
  quantity : number = 1;
  cartService : CartService = inject(CartService);
  router : Router = inject(Router);

  ngOnInit(){
    this.getInStockItem();
  }

  getInStockItem(){
    this.selectedVariation = this.product.variations.find(variation => variation.in_stock === true || variation.in_stock === false)  || null;
    
    return this.selectedVariation;  
  }

  onSelectVariation(variation : VariationProducts | null){
    if(variation?.in_stock !== true && this.product.variations.length == 1) return;
    
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
    this.router.navigate(['/product', product.id], { state: { product } });
  }
}
