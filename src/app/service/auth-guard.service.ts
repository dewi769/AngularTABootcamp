import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router, private loginService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree  {
    if(!this.loginService.isUserLoggedIn()){
      // alert("Anda harus Login terlebih dahulu!");
      Swal.fire({
        title: 'Gagal',
        text: 'Anda Harus Login terlebih dahulu!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.router.navigate(['login'], {queryParams: {lastUrl: route.url }});
      return false;
    } 
    return true;
  }
}
