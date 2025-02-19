import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { RegisterModel } from "../models/RegisterModel";
import { environment } from "../../environments/environment.development";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { User } from "../models/User";

@Injectable({
    providedIn: "root"
})
export class AccountService {
    http : HttpClient = inject(HttpClient);     

    register(user : RegisterModel){
        return this.http.post<{name: string}>(environment.apiUrl + 'auth/register', user);
    }

    login(email : string, password : string) {
        const data = {
            email,
            password,
        }

        return this.http.post(environment.apiUrl + 'auth/authenticate', data, {
            withCredentials: true
        }); 
    }

    checkAuthStatus(): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}auth/me`, {
            withCredentials: true
        });
    }

    logout() {
        
    }
}