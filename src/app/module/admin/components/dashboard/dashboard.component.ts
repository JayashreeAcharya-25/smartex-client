import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  res_msg: any
  res_data: any

  constructor(private api: SharedService) { }

  ngOnInit(): void {

    // this.api
    //   .user()
    //   .subscribe(
    //     response => {
    //       this.res_msg = response
    //       this.res_data = this.res_msg.data
    //       console.log(response)
    //   }, error =>{
    //     console.log(error)
    //   })

  }

  logout(){
    this.api
      .logout(this.res_data)
      .subscribe(
        response => {
          console.log(response)
      }, error =>{
        console.log(error)
      })
  }

}
