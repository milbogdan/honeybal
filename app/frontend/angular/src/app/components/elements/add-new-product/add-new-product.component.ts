import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from '../../../models/Product';
import { VariationProducts } from '../../../models/VariationProducts';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-add-new-product',
  standalone: false,
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.css'
})
export class AddNewProductComponent {
  selectedCategory: any = null;
  nameNewProduct : string = '';
  descriptionNewProduct : string = '';
  selectedProduct: any = null; 

  categories: any[] = [];
  products: Product[] = [];
  images: any[] = [];

  stateOptions : any[] = [
    { label: 'Existed product', value: 1 },
    { label: 'New product', value: 2 },
  ]
  selectedState : number = 1;

  inStockOptions : any[] = [
    {label:'Yes', value:true},
    {label:'No', value:false}
  ];

  variation: VariationProducts = { id: -1, basePrice: 0, size: '', discount: 0, in_stock: false, imageUrl: '', price: 0};
  productService : ProductService = inject(ProductService);

  constructor(
    private _modal: DynamicDialogRef,
    private _dialogConfig: DynamicDialogConfig
  ) {}

  ngOnInit() {
    this.categories = this._dialogConfig?.data.categories || [];
    this.products = this._dialogConfig?.data.products || [];
  }
  
  onCategoryChange() {
    if (this.selectedCategory) {
        this.products = this.products
        .filter(product => product.category.id === this.selectedCategory.id);
    }
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push({ name: file.name, url: e.target.result });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  onSubmit() {
    let data;
    if(this.selectedState === 2){
      data = {
        category : this.selectedCategory.id,
        name : this.nameNewProduct,
        in_stock : this.variation.in_stock,
        imageUrl: "",
        size: this.variation.size,
        basePrice: this.variation.basePrice,
        discount: this.variation.discount,
        description: this.descriptionNewProduct,
      }
    }
    else{

    }

    this.productService.addProduct(data).subscribe({
      next: () => {
        console.log('success');
        this._modal.close(true);
      },
    })
  }
}
