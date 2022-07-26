import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared-service.service';
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

  // loginObjModel: LoginModel = new LoginModel()

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

        this.userData.push(items.data);
        console.log(items)

        Swal.fire({
          title: 'Success',
          text: items.message,
          icon: 'success',
          confirmButtonText: 'Ok'
        });

        localStorage.setItem('token', items.jwt)
        localStorage.setItem('user', JSON.stringify(this.userData))
        
        this.router.navigate(['/admin/home'])
      },
        error => {
          console.log(error);
        }
      )
  }

}
