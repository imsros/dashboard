import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/model/user.interface';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
})
export class UserAddComponent implements OnInit {
  // email = new FormControl('', [Validators.required, Validators.email]);
  form!: FormGroup;
  preview: string | ArrayBuffer | null = null;
  edit = false;
  userId!: string;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.form = this.fb.group({
    //   image: ['', Validators.required],
    //   username: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   address: ['', Validators.required],
    //   phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8,10}$/)]],
    //   type: ['', Validators.required],
    // });
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      image: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8,10}$/)]],
      type: ['', Validators.required],
    });

    //check if the url has id
    this.userId = String(this.route.snapshot.paramMap.get('id'));
    this.edit = !!this.userId;

    if (this.edit) {
      this.loadUser();
    }
  }
  loadUser() {
    this.userService.getUserbyId(this.userId).subscribe((user) => {
      this.form.patchValue({
        image: user.image,
        username: user.username,
        email: user.email,
        address: user.address,
        phone: user.phone,
        type: user.type,
      });
      this.preview = user.image; // show existing image
    });
  }
  //when clicked image , it will browse to our device
  openFile() {
    document.getElementById('fileInput')?.click();
  }
  //and it will perform this function then
  onImageChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.form.patchValue({ image: file });

    const reader = new FileReader();
    reader.onload = () => (this.preview = reader.result);
    reader.readAsDataURL(file);
  }

  submitUser() {
    if (this.form.invalid) return;
    const newUser = {
      ...this.form.value,
      image: this.preview,
    };
    if (this.edit) {
      this.userService.updateUser(this.userId, newUser).subscribe(() => {
        this.router.navigate(['/user']);
      });
      return;
    }
    this.userService.addUser(newUser).subscribe(() => {
      this.router.navigate(['/user']);
    });
  }
}
