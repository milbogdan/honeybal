import { Component, inject, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ProductCategoryService } from '../../../services/productCategory.service';
import { Product } from '../../../models/product.interface';
import { ProductCategory } from '../../../models/productCategory.interface';
import { VariationProducts } from '../../../models/variationProducts.interface';
import { AddNewProdcutComponent } from '../../../components/add-new-prodcut/add-new-prodcut.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddCategoryComponent } from '../../../components/add-category/add-category.component';
import { ProductService } from '../../../services/product.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ProductDialogComponent } from '../../../components/product-dialog/product-dialog.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

@Component({
  selector: 'admin-products-page',
  imports: [ ButtonModule, ConfirmDialogModule, ToastModule, TableModule, FormsModule, ToolbarModule, IconFieldModule, InputIconModule, TagModule, DynamicDialogModule, NgIf ],
  providers: [ DialogService, MessageService, ConfirmationService ],
  templateUrl: './admin-products-page.component.html',
  styleUrl: './admin-products-page.component.css'
})
export class AdminProductsPageComponent {
  ref: DynamicDialogRef | undefined;
  
  // Product
  products!: Product[];
  selectedProducts!: Product[] | null;
  categories! : ProductCategory[];

  submitted: boolean = false;

  statuses!: any[];

  // Table
  @ViewChild('dt') dt!: Table;
  cols!: any[];

  // ExportColumn
  expandedRows = {};
  exportColumns!: any[];

  categorieService : ProductCategoryService = inject(ProductCategoryService);
  productService : ProductService = inject(ProductService);
  dialogService : DialogService = inject(DialogService);
  messageService: MessageService = inject(MessageService);
  confirmationService : ConfirmationService = inject(ConfirmationService);

  ngOnInit(){
    this.fetchProducts();
    this.fetchCategories();
  }

  editProduct(product : Product, variation: VariationProducts){
    this.ref = this.dialogService.open(ProductDialogComponent, {
      header: 'Product List',
      width: '40vw',
      modal: true,
      closable: true,
      closeOnEscape: true,
      dismissableMask: true,
      contentStyle: { overflow: 'auto' },
      breakpoints: {
          '960px': '50vw',
          '640px': '75vw'
      },
      data : {
        product : product,
        variation: variation
      }
    });

    this.ref?.onClose.subscribe({
      next: (response : any) => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: `Successfully updated product` });
      }
    });
  }


  fetchProducts() {
    this.productService.getAllProducts(0, 6).subscribe({
      next: (response : any) => {
          this.products = response.content;
      }
    })

    //   this.statuses = [
    //       { label: 'INSTOCK', value: 'instock' },
    //       { label: 'LOWSTOCK', value: 'lowstock' },
    //       { label: 'OUTOFSTOCK', value: 'outofstock' }
    //   ];

    //   this.cols = [
    //       { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
    //       { field: 'name', header: 'Name' },
    //       { field: 'image', header: 'Image' },
    //       { field: 'price', header: 'Price' },
    //       { field: 'category', header: 'Category' }
    //   ];

    //   this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  addNewProduct() {
    this.ref = this.dialogService.open(AddNewProdcutComponent, {
      header: 'New Product',
      width: '40vw',
      modal: true,
      closable: true,
      closeOnEscape: true,
      dismissableMask: true,
      contentStyle: { overflow: 'auto' },
      breakpoints: {
          '960px': '50vw',
          '640px': '75vw'
      },
      data : {
        categories : this.categories,
        products: this.products 
      }
    });

    this.ref?.onClose.subscribe({
      next: (response : any) => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: `Added new category` });
        this.fetchProducts();
      }
    });
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
            // this.selectedProducts = null;
            console.log(this.selectedProducts);
            this.selectedProducts?.forEach((p) => {
              this.productService.deleteProduct(p.id).subscribe();
            });
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        }
    });
  }

  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${product.name}?`,
      header: 'Delete product',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true,
      },
      acceptButtonProps: {
          label: 'Delete',
          severity: 'danger',
          outlined: true,
      },
      accept: () => {
        this.productService.deleteProduct(product.id).subscribe({
          next: (response : any) => {
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: `You have deleted item ${product.name}` });
            this.fetchProducts();
          }
        });
      },
      reject: () => {
          this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
              life: 3000,
          });
      },
    });
  }

  expandAll() {
    this.expandedRows = this.products.reduce((acc : any, p) => (acc[p.id] = true) && acc, {});
  }

  collapseAll() {
      this.expandedRows = {};
  }

  // CATEGORIES FUNCTIONS

  fetchCategories(){
    this.categorieService.getAllCategories().subscribe({
      next: (response : any) => {
        this.categories = response;
      }
    });
  }

  newCategory(){
    this.ref = this.dialogService.open(AddCategoryComponent, {
      header: 'New Category',
      width: '36vw',
      modal: true,
      closable: true,
      closeOnEscape: true,
      dismissableMask: true,
      contentStyle: { overflow: 'auto' },
      breakpoints: {
          '960px': '50vw',
          '640px': '75vw'
      },
    });

    this.ref?.onClose.subscribe({
      next: (response : any) => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: `Added new category` });
        this.fetchCategories();
      }
    });
  }

  onRowEditSave(id : number, name : string){
    if(name != ''){
      this.categorieService.editCategorieName(id, name).subscribe({
        next: (response : any) => {
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: `You have edited category ${name}` });
        }
      });
    }
  }

  deleteCategory(categorie : ProductCategory){
    this.categorieService.deleteCategorie(categorie.id).subscribe({
      next: (response : any) => {
        this.fetchCategories();
        this.fetchProducts();
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: `${response.message}` });
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }
}
