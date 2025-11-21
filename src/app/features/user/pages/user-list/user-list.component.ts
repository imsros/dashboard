import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/model/user.interface';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'image',
    'username',
    'email',
    'address',
    'phone',
    'type',
    'action',
  ];
  // users: User[] = [];
  dataSource: User[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUser();
  }
  getAllUser(): void {
    this.userService.getAllUser().subscribe((res) => {
      // this.users = res;
      this.dataSource = res;
    });
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe({
      next: () =>
        (this.dataSource = this.dataSource.filter((s) => s.id !== id)),
      error: () => alert('Failed to delete user'),
    });
  }
}
