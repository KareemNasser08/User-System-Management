import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Models/user';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  // Validators
  userForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      age: new FormControl(0, [Validators.required, Validators.min(16), Validators.max(60)]),
      phone: new FormControl(0, [Validators.required, Validators.pattern('^01[0125][0-9]{8}$')]),
      birthDate: new FormControl(''),
    })

  userInfo: User = {
    id:0,
    firstName: '',
    lastName: '',
    age: 28,
    email: 'string',
    phone: 0,
    birthDate: '',
  };
  pageId: number = 0;

  constructor(private _UsersService: UsersService, private _ActivatedRoute: ActivatedRoute, private toastr: ToastrService) {
    this.pageId = _ActivatedRoute.snapshot.params['id'];
    console.log(_ActivatedRoute.snapshot.params['id']);
  }

  ngOnInit(): void {
    if (this.pageId > 0) {
      this.getUserById(this.pageId);
    }
  }


  getUserById(id: number) {
    this._UsersService.getUserById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.userInfo = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Successfully Updated User Info');
        this.userForm.patchValue({
          'firstName': this.userInfo?.firstName,
          'lastName': this.userInfo?.lastName,
          'email': this.userInfo?.email,
          'age': this.userInfo?.age,
          'phone': this.userInfo?.phone,
          'birthDate': this.userInfo?.birthDate,
        })
      }
    })
  }

  onSubmit(data: FormGroup) {
    console.log(data);
    if (this.pageId) {
      this._UsersService.onEditUser(data.value, this.pageId).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }, complete: () => {
          console.log('Successfully Updated User');
          this.toastr.success('User Updated Successfully!', 'Success!')
        }
      })
    }
    else {
      this._UsersService.onAddUser(data.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }, complete: () => {
          console.log('Successfully Added User');
          this.toastr.success('User Added Successfully!', 'Success!')
        }
      })
    }
  }
}
