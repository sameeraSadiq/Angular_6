import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../models/user.model'; // Adjust the path as necessary

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null; // To hold the image preview
  baseUrl: string = 'http://localhost/afternoonPHP%2012-1/'; // Set base URL for images

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router // Injecting Router for navigation
  ) {
    this.editUserForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      phone: [''],
      date: [''],
      membership: [''],
      image: ['']
    });
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id'); 
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        data => {
          console.log('Fetched user data:', data); 
          this.editUserForm.patchValue(data); 
          this.imagePreview = this.baseUrl + data.image; 
        },
        error => {
          console.error('Error fetching user details:', error);
        }
      );
    }
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0]; // Get the selected file
    if (file) {
      const reader = new FileReader(); // Create a FileReader to read the file
      reader.onload = () => {
        this.imagePreview = reader.result; // Set the image preview
      };
      reader.readAsDataURL(file); // Read the file as a data URL
      this.editUserForm.patchValue({ image: file }); // Update the form control with the file
    }
  }

  onSubmit(): void {
    if (this.editUserForm.valid) {
      const formData = new FormData(); // Create a FormData object
      const userId = Number(this.route.snapshot.paramMap.get('id')); // Get the user ID

      // Append form values to FormData
      formData.append('id', userId.toString());
      for (const key in this.editUserForm.value) {
        formData.append(key, this.editUserForm.value[key]);
      }

      this.userService.updateUser(formData).subscribe(
        response => {
          console.log('User updated successfully:', response);
          // Redirect to the main page after successful update
          this.router.navigate(['/']); // Adjust the route as necessary
        },
        error => {
          console.error('Error updating user:', error);
        }
      );
    }
  }
}