import { Component, inject, Output } from '@angular/core';
import { ProductCategoryService } from '../../../services/productCategory.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-category',
  standalone: false,
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  categoryName:string = '';
  submitted : boolean = false;
  categoryService : ProductCategoryService = inject(ProductCategoryService);
  _modal : DynamicDialogRef = inject(DynamicDialogRef)

  onSubmit(){
    if(this.categoryName === ''){
      this.submitted = true;
      return;
    }

    this.categoryService.addNewProductCategory(this.categoryName).subscribe({
      next:(res)=>{
        this.closeModal("Created new category");
      }
    })
  }

  closeModal(param: string) {
    this._modal.close(param);
  }
}
