import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input()
  userData: any[] = [];

  // res_msg: any
  // res_data: any

  constructor(private api: SharedService) { }

  ngOnInit(): void {
    // this.api
    //   .user()
    //   .subscribe(
    //     response => {
    //       this.res_msg = response
    //       this.res_data = this.res_msg.data
    //       console.log(this.res_msg.data)
    //   }, error =>{
    //     console.log(error)
    //   })

  }

}
