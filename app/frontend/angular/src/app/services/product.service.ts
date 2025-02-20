import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private http : HttpClient = inject(HttpClient);
    
    getAllProducts(pageNumber : number, pageSize : number, filters? : any) : Observable<Product[]>{
        let params = new HttpParams();
        params = params.set('page',  pageNumber);
        params = params.set('pageSize', pageSize);

        if(filters){
            Object.keys(filters).forEach(key => {
                if(filters[key] != undefined && filters[key] != '' && filters[key] != null){
                    params = params.set(key, filters[key]);
                }
            })
        }

        return this.http.get<Product[]>(environment.apiUrl + 'products/getAll', {params});
    }

    editProduct(id: number, product : any){
        return this.http.put(environment.apiUrl + `products/put/${id}`, product,
            {withCredentials:true}
        );
    }

    deleteProduct(id: number){
        return this.http.delete(environment.apiUrl + `products/delete/${id}`,
            {withCredentials:true}
        )
    }

    addProduct(product : any){
        return this.http.post(environment.apiUrl + 'products/post',
            product,
            {withCredentials:true}
        )
    }
}