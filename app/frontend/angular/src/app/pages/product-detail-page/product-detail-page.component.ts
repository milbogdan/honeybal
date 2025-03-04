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
  selectedVariation! : any;
  router : Router = inject(Router);
  activeRoute : ActivatedRoute = inject(ActivatedRoute);
  productService : ProductService = inject(ProductService);

  constructor() {
    // console.log(this.router.getCurrentNavigation()!.extras.state);
  }

  ngOnInit() {
    this.product = history.state.product;
    this.selectedVariation = history.state.selectedVariation;
  }
}
