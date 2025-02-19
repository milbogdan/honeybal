import { Component, Input } from '@angular/core';
import { Product } from '../../../models/Product';
import { VariationProducts } from '../../../models/VariationProducts';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-product-dialog',
  standalone: false,
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.css'
})
export class ProductDialogComponent {
  ref: DynamicDialogRef | undefined;
  product: Product = { id: -1, name: '', description: '', category: {id : -1, name: ''} , variations: []};
  variation: VariationProducts = { id: -1, basePrice: 0, size: '', discount: 0, in_stock: false, imageUrl: '', price: 0};

  inStockOptions : any[] = [
    {label:'Yes', value:true},
    {label:'No', value:false}
  ];
  submitted : boolean = false;

  constructor(
    private _modal : DynamicDialogRef,
    private _dialogConfig : DynamicDialogConfig,
  ){}

  ngOnInit(){
    this.product = this._dialogConfig.data.product;
    this.variation = this._dialogConfig.data.variation;

    if (this.variation.in_stock === null || this.variation.in_stock === undefined) {
      this.variation.in_stock = false;
    }
  }
}
