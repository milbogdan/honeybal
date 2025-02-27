import { Component, inject } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductCategoryService } from '../../services/productCategory.service';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-category',
  imports: [ ButtonModule, FormsModule, NgIf ],
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
