import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string = '';
  private http = inject(HttpClient);

  login(user: IUser): Observable<{ token: string; }> {
    return this.http.post<{ token: string; }>(`${environment.apiUrl}/auth/login`, user).pipe(
      tap(
        ({ token }) => {
          localStorage.setItem('auth-token', token);
          this.setToken(token);
        }
      )
    );
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.apiUrl}/auth/register`, user);
  }

  logout() {
    this.setToken('');
    localStorage.clear();
  }
}
