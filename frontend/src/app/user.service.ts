
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user.model'; // Adjust the path as necessary
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost/afternoonPHP%2012-1/get_users.php';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User[]>(`http://localhost/afternoonPHP%2012-1/get_users.php?id=${id}`).pipe(
        map(users => users[0]) // Get the first user from the array
    );
}

  updateUser(user: FormData): Observable<any> {
    return this.http.post<any>('http://localhost/afternoonPHP%2012-1/edit_user.php', user);
}

  deleteUser(id: number): Observable<any> {
    return this.http.post<any>('http://localhost/afternoonPHP%2012-1/delete_user.php', { id });
  }
}