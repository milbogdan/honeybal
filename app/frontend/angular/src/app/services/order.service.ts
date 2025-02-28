import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Order } from "../models/order.interface";

@Injectable({
  providedIn: 'root'
})

export class OrderService {
    http : HttpClient = inject(HttpClient);

    makeOrder(orderData : Order) {
        return this.http.post(environment.apiUrl + 'orders/post', orderData);
    }
}