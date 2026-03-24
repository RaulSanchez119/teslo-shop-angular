import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthResponse } from '@auth/interfaces/auth-response.interface';
import { User } from '@auth/interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

const CACHE_TTL_MS = 15 * 60 * 1000;

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  private http = inject(HttpClient);

  private _cachedAuthResponse: AuthResponse | null = null;
  private _cacheTimestamp: number = 0;

  checkStatusResource = rxResource({
    stream: () => this.checkStatus(),
  });

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';
    if (this._user()) return 'authenticated';
    return 'not-authenticated';
  });

  user = computed(() => this._user());
  token = computed(this._token);
  isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false);

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, { email, password }).pipe(
      map((resp) => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    );
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }

    const isCacheValid =
      this._cachedAuthResponse !== null &&
      Date.now() - this._cacheTimestamp <= CACHE_TTL_MS;

    if (isCacheValid) {
      this.handleAuthSuccess(this._cachedAuthResponse!);
      return of(true);
    }

    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`).pipe(
      tap((resp) => {
        this._cachedAuthResponse = resp;
        this._cacheTimestamp = Date.now();
      }),
      map((resp) => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    );
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');
    localStorage.removeItem('token');

    this._cachedAuthResponse = null;
    this._cacheTimestamp = 0;
  }

  private handleAuthSuccess({ token, user }: AuthResponse) {
    this._user.set(user);
    this._authStatus.set('authenticated');
    this._token.set(token);
    localStorage.setItem('token', token);
    return true;
  }

  private handleAuthError(error: any) {
    this.logout();
    return of(false);
  }

  register(email: string, password: string, fullName: string) {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/register`, {
      email,
      password,
      fullName,
    }).pipe(
      map((resp) => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    );
  }
}
