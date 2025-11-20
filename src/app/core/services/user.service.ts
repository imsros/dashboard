import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userAPI = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.userAPI);
  }
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userAPI, user);
  }
}
