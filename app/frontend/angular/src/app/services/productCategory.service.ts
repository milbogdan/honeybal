import { inject, Injectable } from '@angular/core';
import { ProductCategory } from '../models/productCategory.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class ProductCategoryService {
    http : HttpClient = inject(HttpClient);

    addNewProductCategory(categName : string) : Observable<string>{
        return this.http.post<string>(environment.apiUrl + 'productCategories/post', {name : categName}, {withCredentials : true});
    }

    getAllCategories() : Observable<ProductCategory[]>{
        return this.http.get<ProductCategory[]>(environment.apiUrl + "productCategories/getAll");
    }

    editCategorieName(id: number, categName : string) : Observable<string>{
        return this.http.put<string>(environment.apiUrl + 'productCategories/put/' + id, {name : categName}, {withCredentials : true});
    }

    deleteCategorie(id : number){
        return this.http.delete(environment.apiUrl + 'productCategories/delete/' + id, {withCredentials : true});
    }
}