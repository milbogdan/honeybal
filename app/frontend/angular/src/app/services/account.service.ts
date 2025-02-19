import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { RegisterModel } from "../models/RegisterModel";
import { environment } from "../../environments/environment.development";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { User } from "../models/User";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class AccountService {
    http : HttpClient = inject(HttpClient);
    router : Router = inject(Router);
    user : any | null = null;
    private userSubject = new BehaviorSubject<User | null>(null); // BehaviorSubject
    user$ = this.userSubject.asObservable();

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
        })
        .pipe(
            tap((response : any) => {
                this.getUser().subscribe({
                    next: (user) => {
                        console.log(user);
                        this.userSubject.next(user);

                        if(user.role === "ROLE_ADMIN"){
                            this.router.navigate(['/admin']);
                        }
                        else{
                            this.router.navigate(['/home']);
                        }
                    },
                });
            })
        ); 
    }

    getUser(): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}auth/me`, {
            withCredentials: true
        }).pipe(
            tap((user : any) => {
                this.userSubject.next(user);
            })
        );
    }

    logout() {
        return this.http.post(`${environment.apiUrl}auth/logout`, {}, {
            withCredentials: true
        }).pipe(
            tap(() => {
                this.userSubject.next(null);
                // this.router.navigate(['/login']);
            })
        );
    }
}