// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  date: string;
  membership: string;
  image: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  message: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      error => {
        this.message = 'Error fetching users: ' + error.message;
        console.error('Error fetching users', error);
      }
    );
  }

  editUser(user: User) {
    this.router.navigate(['/edit-user', user.id]); 
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(
        response => {
          this.message = response.message;
          this.fetchUsers(); 
        },
        error => {
          this.message = 'Error deleting user: ' + error.message;
          console.error('Error deleting user', error);
        }
      );
    }
  }
}