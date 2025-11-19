import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../auth.service';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
  const router: Router = inject(Router);
  const authService = inject(AuthService);

  // Check the authentication status
  return authService.check().pipe(
    map((authenticated) => {
      // If the user is not authenticated...
      if (!authenticated) {
        // Redirect to the sign-in page with a redirectUrl param
        const redirectURL =
          state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
        const urlTree = router.parseUrl(`sign-in?${redirectURL}`);
        return urlTree;
      }

      // Allow access immediately
      return true;
    })
  );
};
