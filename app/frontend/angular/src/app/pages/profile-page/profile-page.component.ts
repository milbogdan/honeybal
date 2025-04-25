import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { EditUserComponent } from '../../components/edit-user/edit-user.component';
import { OrderTableComponent } from '../../components/order-table/order-table.component';
import { WishItemComponent } from '../../components/wish-item/wish-item.component';
import { FavoriteProductService } from '../../services/favorite-product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule, NavbarComponent, EditUserComponent, OrderTableComponent, WishItemComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  wishItems: any[] = [];
  favoriteProductService : FavoriteProductService = inject(FavoriteProductService);
  page: number = 0;
  limit: number = 5;
  totalElements: number = 1;

  ngOnInit(){
    this.loadFavoriteProducts();
  }

  loadFavoriteProducts() {
    if(this.wishItems.length === this.totalElements){
      return;
    }

    this.favoriteProductService.getFavoriteProducts(this.page, this.limit).subscribe({
      next: (response : any) => {
        
        this.wishItems = [...this.wishItems, ...response.content];
        this.page++;
        this.totalElements = response.totalElements;
      }
    });
  }

  onScroll(event: any) {
    const element = event.target;
    const atEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - 1;

    if (atEnd) {
      this.loadFavoriteProducts();
    }
  }

  onRemoveFavorite(productId: number) {
    this.wishItems = this.wishItems.filter(item => item.id !== productId);
  }
}
