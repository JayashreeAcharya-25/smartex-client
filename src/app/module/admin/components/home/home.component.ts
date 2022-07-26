import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/service/shared-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input()
  userData: any[] = [];

  user: any

  constructor(private api: SharedService) { }

  ngOnInit(): void {
    
    this.user = localStorage.getItem('user');
    this.userData = JSON.parse(this.user)
    console.log(this.userData)
    
    // if(this.user){
    //   try{
    //     this.userData = JSON.parse(this.user)
    //     console.log(this.userData)
    //   } catch(e) {}
    // } 
  }

}
