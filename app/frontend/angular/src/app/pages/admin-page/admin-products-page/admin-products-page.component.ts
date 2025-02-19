import { ChangeDetectorRef, Component, ViewChild, inject, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from '../../../models/Product';
import { ProductService } from '../../../services/product.service';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductDialogComponent } from '../../../components/elements/product-dialog/product-dialog.component';
import { VariationProducts } from '../../../models/VariationProducts';
import { ProductCategoryService } from '../../../services/productCategory.service';
import { ProductCategory } from '../../../models/ProductCategory';


@Component({
  selector: 'admin-products-page',
  standalone: false,
  templateUrl: './admin-products-page.component.html',
  styleUrl: './admin-products-page.component.css'
})
export class AdminProductsPageComponent {
  ref: DynamicDialogRef | undefined;
  
  // Product
  products!: Product[];
  categories! : ProductCategory[];

  // Product
  selectedProducts!: any[] | null;

  submitted: boolean = false;

  statuses!: any[];

  // Table
  @ViewChild('dt') dt!: any;

  // Column
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
    this.fetchData();
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
  }


  fetchData() {
      this.productService.getAllProducts(0, 6).subscribe({
        next: (response : any) => {
            this.products = response.content;
        }
      })

      this.categorieService.getAllCategories().subscribe({
        next: (response : any) => {
            this.categories = response;
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

//   findIndexById(id: string): number {
//       let index = -1;
//       for (let i = 0; i < this.products.length; i++) {
//           if (this.products[i].id === id) {
//               index = i;
//               break;
//           }
//       }

//       return index;
//   }

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

  expandAll() {
    this.expandedRows = this.products.reduce((acc : any, p) => (acc[p.id] = true) && acc, {});
  }

  collapseAll() {
      this.expandedRows = {};
  }

  exportCSV() {
    this.dt.exportCSV();
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }
}
