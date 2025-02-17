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

  ngOnInit(){
    this.getInStockItem();
    console.log(this.selectedVariation);
  }

  getInStockItem(){
    this.selectedVariation = this.product.variations.find(variation => variation.in_stock === true) || null;
    return this.selectedVariation;  
  }
}
