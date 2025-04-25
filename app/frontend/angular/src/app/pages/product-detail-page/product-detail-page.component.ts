import { Component, inject } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';  
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail-page',
  imports: [NavbarComponent, FooterComponent, NgFor, NgClass],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.css'
})
export class ProductDetailPageComponent {
  product! : Product;
  selectedVariation! : any;
  router : Router = inject(Router);
  activeRoute : ActivatedRoute = inject(ActivatedRoute);
  productService : ProductService = inject(ProductService);

  ngOnInit() {
    this.product = history.state.product;
    this.selectedVariation = history.state.selectedVariation;
  }

  changeVariation(variation: any) {
    this.selectedVariation = {
      productId : this.product.id,
      productName : this.product.name,
      catergyName : this.product.category.name,
      variationId : variation?.id,
      variationSize : variation?.size,
      variationImageUrl : variation?.imageUrl,
      variationBasePrice : variation?.basePrice,
      variationPrice : variation?.price,
      variationDiscount : variation?.discount,
      variationInStock : variation?.in_stock,
    };
  }
}
