import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { MainComponent } from './Components/main/main.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { UsersListComponent } from './Components/users-list/users-list.component';
import { HomeComponent } from './Components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './Components/header/header.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { GenderPipe } from './Pipes/gender.pipe';
import { SearchKeyPipe } from './Pipes/search-key.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { GlobalAuthInterceptor } from './Interceptors/global-auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    MainComponent,
    SidebarComponent,
    AddUserComponent,
    UsersListComponent,
    HomeComponent,
    HeaderComponent,
    ProfileComponent,
    GenderPipe,
    SearchKeyPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      progressBar: true,
      closeButton: true
    }), // ToastrModule added
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: GlobalAuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
