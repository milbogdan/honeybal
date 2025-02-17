import { inject, Injectable } from '@angular/core';
import { ProductCategory } from '../models/ProductCategory';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class ProductCategoryService {
    http : HttpClient = inject(HttpClient);

    getAllCategories() : Observable<ProductCategory[]>{
        return this.http.get<ProductCategory[]>(environment.apiUrl + "productCategories/getAll");
    }
}