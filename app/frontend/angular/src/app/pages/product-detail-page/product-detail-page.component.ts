import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail-page',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.css'
})
export class ProductDetailPageComponent {
  product! : Product;
  router : Router = inject(Router);
  activeRoute : ActivatedRoute = inject(ActivatedRoute);
  productService : ProductService = inject(ProductService);
  
  ngOnInit() {
    const productId = this.activeRoute.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(+productId).subscribe({
        next: (data) => {
          this.product = data;
        },
        error: (err) => {
          console.error('Greška prilikom dohvatanja proizvoda:', err);
        }
      });
    }
  }
}
