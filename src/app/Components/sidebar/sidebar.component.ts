import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  userName: string | null = localStorage.getItem('userName') ? localStorage.getItem('userName') : 'Kareem Nasser';
  imageUrl: string | null = localStorage.getItem('image') ? localStorage.getItem('image') : '../../../assets/imgPort.jpg';


  constructor(private _Router: Router) { }

  onSignOut() {
    localStorage.removeItem('userName');
    localStorage.removeItem('image');
    localStorage.removeItem('token');
    this._Router.navigate(['/sign-in'])
  }
}
