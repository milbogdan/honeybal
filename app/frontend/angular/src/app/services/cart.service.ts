import { Injectable } from "@angular/core";
import { Product } from "../models/product.interface";
import { BehaviorSubject } from "rxjs";

@Injectable ({
    providedIn: 'root'
})
export class CartService {
    private cartState = new BehaviorSubject<any[]>(this.getFromLocalStorage());
    cart$ = this.cartState.asObservable();

    updateCart(newItem: any){
        const currentCart = this.cartState.getValue();
        const existingItemIndex = currentCart.findIndex((item : any) => item.productId === newItem.productId && item.variationId === newItem.variationId);

        if(existingItemIndex !== -1){
            currentCart[existingItemIndex] = {
                ...currentCart[existingItemIndex],
                variationQuantity: currentCart[existingItemIndex].variationQuantity + newItem.variationQuantity
            }
        }
        else{
            currentCart.push(newItem);
        }

        this.cartState.next([...currentCart]);
        this.setInLocalStorage(currentCart);
    }

    removeCartItem(variationId: number){
        const currentCart = this.cartState.getValue();
        const filteredCart = currentCart.filter(item => item.variationId !== variationId);
        this.cartState.next(filteredCart);
        this.setInLocalStorage(filteredCart);
    }
    
    private setInLocalStorage(cartItems: any[]) {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    private getFromLocalStorage(): any[] {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : [];
        }
        return [];
    }
}