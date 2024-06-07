import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userInfo: User = {
    id: 0,
    firstName: '',
    lastName: '',
    age: 28,
    email: 'string',
    phone: 0,
    birthDate: '',
  };

  userProfileImage: string = '';


  constructor(private _UsersService: UsersService) {

  }

  ngOnInit(): void {
    this._UsersService.getCurrentUser().subscribe({
      next: (res) => {
        console.log(res);
        this.userInfo.id = res.id;
        this.userInfo.firstName = res.firstName;
        this.userInfo.lastName = res.lastName;
        this.userInfo.age = res.age;
        this.userInfo.email = res.email;
        this.userInfo.birthDate = res.birthDate;
        this.userInfo.phone = res.phone;
        this.userProfileImage = res.image;
      },
      error: (err) => {
        console.log(err);

      },
      complete: () => {

      },
    })
  }
}
