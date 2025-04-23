import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterModel } from '../models/registerModel.interface';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, finalize, Observable, Subject, tap } from 'rxjs';
import { User } from '../models/user.interface';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);

  private userSource = new BehaviorSubject<User | null | undefined>(undefined);
  currentUser = this.userSource.asObservable();
  private loadingSource = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSource.asObservable();

  changeUser(user: User | null) {
    this.userSource.next(user);
  }

  register(user: RegisterModel): Observable<any> {
    return this.http.post(
      environment.apiUrl + 'auth/register',
      user,
      httpOptions
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(
        environment.apiUrl + 'auth/authenticate',
        {
          email,
          password,
        },
        httpOptions
      )
      .pipe(tap(() => this.loadCurrentUser()));
  }

  logout(): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}auth/logout`, {}, httpOptions)
      .pipe(tap(() => this.changeUser(null)));
  }

  loadCurrentUser() {
    this.loadingSource.next(true);
    this.http
      .get<User>(`${environment.apiUrl}auth/me`)
      .pipe(
        tap({
          next: (user) => this.changeUser(user),
          error: () => this.changeUser(null),
        }),
        finalize(() => this.loadingSource.next(false))
      )
      .subscribe();
  }

  editUser(id: number, editedUser: User) {
    return this.http.put(`${environment.apiUrl}users/put/${id}`, editedUser)
  }
}
