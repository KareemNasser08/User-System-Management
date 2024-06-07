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
    return this._HttpClient.get(`https://dummyjson.com/users?limit=${limit}`);
  }
  getUserById(id: number): Observable<any> {
    return this._HttpClient.get(`https://dummyjson.com/users/${id}`);
  }
  onAddUser(data: User): Observable<any> {
    return this._HttpClient.post(`https://dummyjson.com/users/add`, data);
  }
  onEditUser(data: User, id: number): Observable<any> {
    return this._HttpClient.put(`https://dummyjson.com/users/${id}`, data);
  }
  onDeleteUser(id: number): Observable<any> {
    return this._HttpClient.delete(`https://dummyjson.com/users/${id}`);
  }
}
