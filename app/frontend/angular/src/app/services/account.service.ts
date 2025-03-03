import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { RegisterModel } from "../models/registerModel.interface";
import { environment } from "../../environments/environment.development";
import { BehaviorSubject, Observable, tap, catchError, of, throwError } from "rxjs";
import { User } from "../models/user.interface";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class AccountService {
    http : HttpClient = inject(HttpClient);
    router : Router = inject(Router);
    private userSubject = new BehaviorSubject<User | null>(null);
    user$ = this.userSubject.asObservable();

    register(user : RegisterModel){
        return this.http.post<{name: string}>(environment.apiUrl + 'auth/register', user);
    }

    login(email : string, password : string) {
        const data = {email, password}

        return this.http.post<User>(environment.apiUrl + 'auth/authenticate', data, {
            withCredentials: true
        }).pipe(
            tap((user: User) => this.userSubject.next(user))
        );
    }

    getUser(): Observable<User | null> {
        return this.http.get<User>(`${environment.apiUrl}auth/me`, {
            withCredentials: true
        }).pipe(
            tap((user : User) => this.userSubject.next(user)),
            catchError(error => {
                if (error.status === 401) {
                    this.userSubject.next(null);
                    return of(null);
                }
                return throwError(() => error); 
            })
        );
    }

    logout() {
        this.userSubject.next(null);
        return this.http.post(`${environment.apiUrl}auth/logout`, {}, {
            withCredentials: true
        }).pipe(
            tap(() => this.userSubject.next(null))
        );
    }
}