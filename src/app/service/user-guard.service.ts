import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate {

  isUser;
  constructor(private authS: AuthService, private router: Router) {

  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : boolean | Observable<boolean> | Promise<boolean> {
if (localStorage.getItem('id')) {
  return true;
}
this.router.navigate(['/home']);
return false;
}


}

