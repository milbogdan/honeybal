import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
    providedIn: 'root'
})
export class FavoriteProductService {
    private http : HttpClient = inject(HttpClient);
    loading : boolean = false;
    
    getFavoriteProducts(pageNumber : number, pageSize : number){
        return this.http.get(`${environment.apiUrl}wishlist/getAll?page=${pageNumber}&pageSize=${pageSize}`);
    }

    addProductToFavorite(variationId: number){
        return this.http.post(`${environment.apiUrl}wishlist/post?productVariationId=${variationId}`, {});
    }

    removeProductFromFavorite(wishListItemId: number){
        return this.http.delete(`${environment.apiUrl}wishlist/delete?wishlistId=${wishListItemId}`);
    }
}