import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import { EditUserComponent } from './edit-user/edit-user.component'; 
const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'users', component: UserListComponent },
  { path: 'edit-user/:id', component: EditUserComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }