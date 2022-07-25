import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formValue!: FormGroup

  constructor(private formBuilder: FormBuilder, private api: SharedService, private router: Router) {
    this.formValue = this.formBuilder.group({
      username: [''],
      email: [''],
      password: [''],
      confirm_password: [''],
    })
  }

  ngOnInit(): void {
  }

  signup() {

    this.api
      .signUp(this.formValue.value)
      .subscribe(
        (response: any) => {

          Swal.fire({
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          console.log(response);
          this.router.navigate(['login'])
        },
        error => {
          console.log(error);
        }
      )
  }

}
