// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserService } from './user.service';

const routes = [
  { path: '', component: RegisterComponent },
  { path: 'users', component: UserListComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    UserListComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Include HttpClientModule
    FormsModule,
    // AppRoutingModule
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
