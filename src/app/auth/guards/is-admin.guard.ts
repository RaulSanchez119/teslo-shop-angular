import { inject } from '@angular/core';
import {
  CanMatchFn,
  Router,
  UrlSegment,
} from '@angular/router';

import { AuthService } from '@auth/services/auth.service';
import { filter, firstValueFrom } from 'rxjs';
import { Route } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';

export const IsAdminGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  await firstValueFrom(
    toObservable(authService.authStatus).pipe(
      filter(status => status !== 'checking')
    )
  );

  if(authService.isAdmin()) return true;

  router.navigate(['/']);
  return false;
};
