import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-page',
  standalone: false,
  templateUrl: './admin-products-page.component.html',
  styleUrl: './admin-products-page.component.css'
})
export class AdminProductsPageComponent {
  productDialog: boolean = false;

  // Product
  products!: any[];

  // Product
  product!: any;

  // Product
  selectedProducts!: any[] | null;

  submitted: boolean = false;

  statuses!: any[];

  // Table
  @ViewChild('dt') dt!: any;

  // Column
  cols!: any[];

  // ExportColumn
  exportColumns!: any[];

  exportCSV() {
      this.dt.exportCSV();
  }

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef
  ) {}

  loadDemoData() {
      // this.productService.getProducts().then((data) => {
      //     this.products = data;
      //     this.cd.markForCheck();
      // });

      this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];

      this.cols = [
          { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
          { field: 'name', header: 'Name' },
          { field: 'image', header: 'Image' },
          { field: 'price', header: 'Price' },
          { field: 'category', header: 'Category' }
      ];

      this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
  }

  editProduct(product: any) {
      this.product = { ...product };
      this.productDialog = true;
  }

  deleteSelectedProducts() {
    // this.confirmationService.confirm({
    //     message: 'Are you sure you want to delete the selected products?',
    //     header: 'Confirm',
    //     icon: 'pi pi-exclamation-triangle',
    //     accept: () => {
    //         this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
    //         this.selectedProducts = null;
    //         this.messageService.add({
    //             severity: 'success',
    //             summary: 'Successful',
    //             detail: 'Products Deleted',
    //             life: 3000
    //         });
    //     }
    // });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  // Product
  deleteProduct(product: any) {
      // this.confirmationService.confirm({
      //     message: 'Are you sure you want to delete ' + product.name + '?',
      //     header: 'Confirm',
      //     icon: 'pi pi-exclamation-triangle',
      //     accept: () => {
      //         this.products = this.products.filter((val) => val.id !== product.id);
      //         this.product = {};
      //         this.messageService.add({
      //             severity: 'success',
      //             summary: 'Successful',
      //             detail: 'Product Deleted',
      //             life: 3000
      //         });
      //     }
      // });
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

  // getSeverity(status: string) {
  //     switch (status) {
  //         case 'INSTOCK':
  //             return 'success';
  //         case 'LOWSTOCK':
  //             return 'warning';
  //         case 'OUTOFSTOCK':
  //             return 'danger';
  //     }
  // }

  saveProduct() {
    // this.submitted = true;

    // if (this.product.name?.trim()) {
    //     if (this.product.id) {
    //         this.products[this.findIndexById(this.product.id)] = this.product;
    //         this.messageService.add({
    //             severity: 'success',
    //             summary: 'Successful',
    //             detail: 'Product Updated',
    //             life: 3000
    //         });
    //     } else {
    //         this.product.id = this.createId();
    //         this.product.image = 'product-placeholder.svg';
    //         this.products.push(this.product);
    //         this.messageService.add({
    //             severity: 'success',
    //             summary: 'Successful',
    //             detail: 'Product Created',
    //             life: 3000
    //         });
    //     }

    //     this.products = [...this.products];
    //     this.productDialog = false;
    //     this.product = {};
    // }
  }
}
