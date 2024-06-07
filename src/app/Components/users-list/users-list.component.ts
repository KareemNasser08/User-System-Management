import { Component, /* OnChanges, */ OnInit, /*SimpleChanges*/ } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Models/user';
import { UsersService } from 'src/app/Services/users.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit/*, OnChanges */ {

  searchKey: string = '';
  recordsLimit: number = 0;
  usersList: User[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  numberOfPages: number = 1;

  constructor(private _UsersService: UsersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.onGetAllUsers();
    this.recordsLimit = 5;
  }
  
  onGetAllUsers() {
    this._UsersService.getAllUsers(this.recordsLimit).subscribe({
      next: (res) => {
        console.log(res);
        this.usersList = res.users;
        this.recordsLimit = this.usersList.length;

      },
      error: (err) => {
        console.log(err);
      },
      complete: () => { },
    });
  }
  
  nextPageButton() {
    this.currentPage = this.currentPage + 1;
  }
  
  previousPageButton() {
    if (this.currentPage - 1 <= 1) {
      return this.currentPage = 1;
    } else {
      return this.currentPage = this.currentPage - 1;
    }
  }
  
  updateLimit(newLimit: number): void {
    this.recordsLimit = newLimit;
    this.onGetAllUsers();
    if (Math.floor(this.recordsLimit % this.itemsPerPage) === 0) {
      this.numberOfPages = Math.floor(this.recordsLimit / this.itemsPerPage);
    } else {
      this.numberOfPages = Math.floor(this.recordsLimit / this.itemsPerPage) + 1;
    }
  }
  
  get paginatedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.usersList.slice(startIndex, endIndex);
  }

  deleteUser(id: number) {
    this._UsersService.onDeleteUser(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Completed Request');
        this.toastr.success('User Deleted Successfully!', 'Success!')
        this.onGetAllUsers();
      }
    })
  }

}