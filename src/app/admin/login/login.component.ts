import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { IUser, IUserWrapper } from 'src/app/interface/i-user';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { LoginService } from 'src/app/service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  defaultUrl: string = "listPengajuan";
  lastUrl: string | null = "";
  messageError: string = "";

  loginUser:any = {
    username: "",
    password: ""
  };

  user: IUserWrapper = {} as IUserWrapper;

  constructor(private loginService: LoginService,
    private localStorage: LocalStorageService,
    private router: Router) {
    // this.requiredForm = new FormGroup({
    //   username: new FormControl(this.loginUser.username,[
    //     Validators.required,
    //     Validators.minLength(5),
    //   ]),
    //   password: new FormControl(this.loginUser.password,[
    //     Validators.required,
    //     Validators.minLength(5),
    //   ])
    // })
   }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }


  onLogin() {
    this.loginService.login(this.loginUser)
      .pipe(catchError((error: HttpErrorResponse) => {
        // Display error message from the HttpErrorResponse object
        const errorMessage = error.error.error.message || 'An error occurred during login';
        console.log(errorMessage);
        
        Swal.fire({
          title: 'Gagal!',
          html: `<p>${errorMessage}</p>`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
        
        return throwError(() => new Error("Error login"));
      }))
      .subscribe((response: IUserWrapper) => {
        this.user = response;
        // console.log(this.user);
  
        if (this.user.success == true) {
          this.localStorage.save("USERNAME", response.data.token);
          Swal.fire({
            title: 'Success!',
            html: `<p>${this.user.message}</p><p>Selamat Datang ${this.loginUser.username}</p>`,
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Navigate to a new page after the SweetAlert is closed
            this.router.navigate(['/listPengajuan']);
          });
        } else {
          Swal.fire({
            title: 'Gagal!',
            html: `<p>${this.user.message}</p>`,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
  }

}
