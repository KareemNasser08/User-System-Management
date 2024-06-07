import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthSignInService {

  constructor(private _HttpClient: HttpClient) { }

  onSignIn(data: FormGroup): Observable<any> {
    return this._HttpClient.post('auth/login', data)
  }
}
