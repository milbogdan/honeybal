import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FavoriteProductService } from '../../services/favorite-product.service';

@Component({
  selector: 'wish-item',
  imports: [],
  templateUrl: './wish-item.component.html',
  styleUrl: './wish-item.component.css'
})
export class WishItemComponent {
  @Input() item : any;
  @Output() removed = new EventEmitter<number>();
  favoriteProductService : FavoriteProductService = inject(FavoriteProductService);

  removeFavorite() {
    this.favoriteProductService.removeProductFromFavorite(this.item.id).subscribe({
      next: () => {
        console.log("Obrisan");
        this.removed.emit(this.item.id);
      }
    });
  }
}
