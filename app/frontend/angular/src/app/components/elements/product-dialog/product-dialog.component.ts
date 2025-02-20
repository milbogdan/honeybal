import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../models/Product';
import { VariationProducts } from '../../../models/VariationProducts';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-dialog',
  standalone: false,
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.css'
})
export class ProductDialogComponent {
  product: Product = { id: -1, name: '', description: '', category: {id : -1, name: ''} , variations: []};
  variation: VariationProducts = { id: -1, basePrice: 0, size: '', discount: 0, in_stock: false, imageUrl: '', price: 0};
  submitted : boolean = false;
  productService : ProductService = inject(ProductService);

  inStockOptions : any[] = [
    {label:'Yes', value:true},
    {label:'No', value:false}
  ];

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

  onSubmitEdit(){
    const editedObject = {
      category : this.product.category.id,
      name: this.product.name,
      description : this.product.description,
      variation : {
        id: this.variation.id,
        size: this.variation.size,
        imageUrl: this.variation.imageUrl,
        basePrice: this.variation.basePrice,
        discount: this.variation.discount,
        in_stock: this.variation.in_stock,
      }
    }

    this.productService.editProduct(this.product.id, editedObject).subscribe((response) => {
      console.log(response);
    })

    // { product: this.product, variation: this.variation }
    this._modal.close();
  }
}
