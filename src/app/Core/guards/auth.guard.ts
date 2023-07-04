import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  UrlTree,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
  private isGuardExecuted = false;

  constructor(private router: Router, private authService: AuthService) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.guard();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.guard(state);
  }

  private guard(state?: RouterStateSnapshot):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.isGuardExecuted) {
      // Guard has already been executed once, return true to allow navigation
      return true;
    }
    this.isGuardExecuted = true;
    if (state?.url === '/auth/login' && this.authService.isAuthenticated()) {
      // User is already logged in, redirect to /books
      return this.router.createUrlTree(['/books']);
    }

    return this.authService.token.pipe(
      take(1),
      map((token: string | null) => {
        if (token) {
          if (state?.url === '/auth/account') {
            return this.router.createUrlTree(['/auth/account']);
          }
          return this.router.createUrlTree(['/books']);
        } else {
          return true;
        }
      })
    );
  }
}
