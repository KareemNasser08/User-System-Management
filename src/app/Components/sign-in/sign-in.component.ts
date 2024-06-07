import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSignInService } from 'src/app/Services/auth-sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  isHide: boolean = true;
  isHideFn() {
    return this.isHide = !this.isHide;
  }

  signInForm = new FormGroup({
    username: new FormControl(null),
    password: new FormControl(null)
  })

  errorInvalid: string = '';

  constructor(private _AuthSignInService: AuthSignInService, private _Router: Router) { }

  onLogIn(data: FormGroup) {
    console.log(data.value);
    this._AuthSignInService.onSignIn(data.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('userName', `${res.firstName} ${res.lastName}`);
        localStorage.setItem('image', res.image);
      },
      error: (err) => {
        console.log(err.error.message);
        this.errorInvalid = err.error.message;
      },
      complete: () => {
        console.log('Successfully SignIn');
        this._Router.navigate(['/main'])
      },
    })
  }
}
