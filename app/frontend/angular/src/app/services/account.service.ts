import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { RegisterModel } from "../models/RegisterModel";
import { environment } from "../../environments/environment.development";

@Injectable({
    providedIn: "root"
})
export class AccountService {
    http : HttpClient = inject(HttpClient); 

    register(user : RegisterModel){
        return this.http.post<{name: string}>(environment.apiUrl + 'auth/register', user);
    }

    login(email : string, password : string){
        const data = {
            email,
            password
        }
        console.log(data);

        return this.http.post(environment.apiUrl + 'auth/authenticate', data);
    }
}