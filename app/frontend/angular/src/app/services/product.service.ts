import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private http : HttpClient = inject(HttpClient);
    
    getAllProducts(pageNumber : number, pageSize : number) : Observable<Product[]>{
        return this.http.get<Product[]>(environment.apiUrl + 'api/products/getAll?page='+pageNumber+'&pageSize='+pageSize)
    }
}