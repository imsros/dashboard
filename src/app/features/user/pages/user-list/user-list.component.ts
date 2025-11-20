import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/model/user.interface';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // this.userService.getAllUser().subscribe((response) => {
    //   this.users = response;
    // });
    this.getAllUser();
  }

  getAllUser(): void {
    this.userService.getAllUser().subscribe({
      next: (response) => (this.users = response),
      error: () => alert('Failed'),
    });
  }
}
