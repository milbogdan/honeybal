import { Injectable } from "@angular/core";
import { Product } from "../models/Product";
import { BehaviorSubject } from "rxjs";

@Injectable ({
    providedIn: 'root'
})
export class CartService {
    private cartState = new BehaviorSubject<any[]>([]);
    cart$ = this.cartState.asObservable();

    updateCart(newItem: any){
        const currentCart = this.cartState.getValue();
        const existingItemIndex = currentCart.findIndex((item : any) => item.productId === newItem.productId && item.variationId === newItem.variationId);

        console.log(existingItemIndex);

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
        console.log(currentCart);
    }
    
}