import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null
  private http = inject(HttpClient)
  
  login(user: IUser): Observable<{token: string}> {
    return this.http.post<{ token: string; }>('/api/auth/login', user).pipe(
      tap(
        ({ token }) => {
          localStorage.setItem('auth-token', token)
          this.setToken(token)
        }
      )
    )
  }
  
  setToken(token: string | null) {
    this.token = token
  }
  
  getToken(): string | null {
    return this.token
  }
  
  isAuthenticated(): boolean {
    return !!this.token
  }
  
  register() {
    
  }
  
  logout() {
    this.setToken(null)
    localStorage.clear()
  }
}
