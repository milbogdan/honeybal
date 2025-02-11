import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { RegisterModel } from "../models/RegisterModel";

@Injectable({
    providedIn: "root"
})
export class AccountService {
    http : HttpClient = inject(HttpClient); 

    register(user : RegisterModel){
        return this.http.post<{name: string}>('http://localhost:8080/auth/register', user);
    }
}