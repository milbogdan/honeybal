import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { RegisterModel } from "../models/RegisterModel";
import { environment } from "../../environments/environment.development";
import { BehaviorSubject, Observable, tap, switchMap, take } from "rxjs";
import { User } from "../models/User";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class AccountService {
    http : HttpClient = inject(HttpClient);
    router : Router = inject(Router);
    private userSubject = new BehaviorSubject<User | null>(null);
    user$ = this.userSubject.asObservable();

    constructor() {
        this.getUser().subscribe({
            next: (user) => {
                this.userSubject.next(user);
            },
            error: () => {
                this.userSubject.next(null);
            }
        });
    }

    register(user : RegisterModel){
        return this.http.post<{name: string}>(environment.apiUrl + 'auth/register', user);
    }

    login(email : string, password : string) {
        const data = {email, password}

        return this.http.post(environment.apiUrl + 'auth/authenticate', data, {
            withCredentials: true
        }).pipe(
            tap(() => this.getUser().subscribe())
        );
    }

    getUser(): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}auth/me`, {
            withCredentials: true
        }).pipe(
            tap(user => this.userSubject.next(user))
        );
    }

    logout() {
        this.userSubject.next(null);
        return this.http.post(`${environment.apiUrl}auth/logout`, {}, {
            withCredentials: true
        }).pipe(
            tap(() => this.router.navigateByUrl('/login'))
        );
    }
}