import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/module/user/components/login/login.service';
import { SharedService } from 'src/app/shared-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input()
  userData: any[] = [];

  user: any

  constructor(private api: SharedService, private _service: LoginService) { }

  ngOnInit(): void {
    this.api
      .user()
      .subscribe(
        (response: any) => {
          
          console.log(response.data)
      }, error =>{
        console.log(error)
      })

    this.user =  this._service.retrievePassedObject()
    console.log(this.user)
  }

}
