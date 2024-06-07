import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _HttpClient: HttpClient) { }

  getAllUsers(limit: number): Observable<any> {
    return this._HttpClient.get(`users?limit=${limit}`);
  }
  getUserById(id: number): Observable<any> {
    return this._HttpClient.get(`users/${id}`);
  }
  onAddUser(data: User): Observable<any> {
    return this._HttpClient.post(`users/add`, data);
  }
  onEditUser(data: User, id: number): Observable<any> {
    return this._HttpClient.put(`users/${id}`, data);
  }
  onDeleteUser(id: number): Observable<any> {
    return this._HttpClient.delete(`users/${id}`);
  }

  getCurrentUser(): Observable<any> {
    return this._HttpClient.get('user/me');
  }
}
