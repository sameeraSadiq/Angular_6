// register.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

interface RegisterResponse {
  message: string;
}

interface RegisterModel {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  date: string;
  membership: string;
  image: File | null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model: RegisterModel = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    date: '',
    membership: '',
    image: null
  };
  message: string = '';
  registeredUser: any;

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.model.image = file ? file : null;
}

onSubmit() {
  const formData = new FormData();
  
  Object.keys(this.model).forEach(key => {
    const value = this.model[key as keyof RegisterModel];
    if (value !== null && value !== undefined) {
      if (key === 'image' && !this.model.image) {
        return;
      }
      formData.append(key, value);
    }
  });

  this.http.post<RegisterResponse>('http://localhost/afternoonPHP%2012-1/register.php', formData)
    .subscribe(
      response => {
        this.message = response.message;
        console.log('User registered', response);
      },
      error => {
        this.message = 'Error registering user: ' + error.message;
        console.error('Error registering user', error);
      }
    );
}

 
}