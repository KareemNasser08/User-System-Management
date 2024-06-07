import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { MainComponent } from './Components/main/main.component';
import { HomeComponent } from './Components/home/home.component';
import { UsersListComponent } from './Components/users-list/users-list.component';
import { authGuard } from './Guards/auth.guard';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { ProfileComponent } from './Components/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  {
    path: 'main', canActivate: [authGuard], component: MainComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'users-list', component: UsersListComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'edit-user/:id', component: AddUserComponent },
      { path: 'profile', component: ProfileComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
