import { Component, Input } from '@angular/core';
import { Product } from '../../../models/Product';
import { VariationProducts } from '../../../models/VariationProducts';

@Component({
  selector: 'product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product! : Product;
  selectedVariation : VariationProducts | null = null;
  quantity : number = 1;

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
}
