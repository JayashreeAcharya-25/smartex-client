import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared-service.service';
import Swal from 'sweetalert2';
import { LoginModel } from './login.model';
import { LoginService } from './login.service';

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

  // loginObjModel: LoginModel = new LoginModel()

  constructor(private formBuilder: FormBuilder, private _service:LoginService, private api: SharedService, private router: Router) {
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
        console.log(items)

        // this.loginObjModel.id = items.data.id

        // const data = {
        //   id: 
        // }

        Swal.fire({
          title: 'Success',
          text: items.message,
          icon: 'success',
          confirmButtonText: 'Ok'
        });

        window.localStorage.setItem('token', items.jwt)
        // this._service.sendUserData(this.userData.data)
        this.router.navigate(['/admin/home'])
      },
        error => {
          console.log(error);
        }
      )
  }

}
