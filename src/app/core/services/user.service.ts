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
  getUserbyId(id: string): Observable<User> {
    return this.http.get<User>(`${this.userAPI}/${id}`);
  }
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userAPI, user);
  }
  //when using Partial, all the fields in the interface User will become optional
  updateUser(id: string, partialUser: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.userAPI}/${id}`, partialUser);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.userAPI}/${id}`);
  }
}
