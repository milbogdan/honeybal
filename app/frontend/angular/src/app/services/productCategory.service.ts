import { Injectable } from '@angular/core';
import { ProductCategory } from '../models/ProductCategory';

@Injectable({
    providedIn: 'root'
})
export class ProductCategoryService {
    categories : ProductCategory[] = [
        {
            id: 1,
            name: "Med"
        },
        {
            id: 2,
            name: "Rakije"
        },
        {
            id: 3,
            name: "Ostali proizvodi"
        }
    ];
}