import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Users } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  user: Users[] = [];


  private UserServ = inject(UserService);

  constructor(){
    this.UserServ.fetchUsers();
  }

  public get users(): Users[]{
    return this.UserServ.users;
  }  

  ngOnInit(): void {
    this.UserServ.fetchUsers();
    this.user = this.UserServ.users;
  }
}
