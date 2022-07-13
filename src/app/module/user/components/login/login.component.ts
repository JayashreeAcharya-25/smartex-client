import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formValue!: FormGroup

  res_message: any;
  message: any;
  userData: any = []

  constructor(private formBuilder: FormBuilder, private api: SharedService, private router: Router) {
    this.formValue = this.formBuilder.group({
      email: [''],
      password: [''],
    })
  }

  ngOnInit(): void {
  }

  login() {
    this.api
      .login(this.formValue.value)
      .subscribe((items: any) => {

        this.userData = items;

        Swal.fire({
          title: 'Success',
          text: items.message,
          icon: 'success',
          confirmButtonText: 'Ok'
        });

        window.localStorage.setItem('token', items.jwt)
        this.router.navigate(['/admin/home'])
      },
        error => {
          console.log(error);
        }
      )
  }

}
