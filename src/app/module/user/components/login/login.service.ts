import { Injectable } from '@angular/core';
import { LoginModel } from './login.model';

@Injectable({
  providedIn: LoginModel,
})
export class LoginService {

  passedData: any[] = [];

  constructor() { }

  sendUserData(item: any){
    this.passedData.push(item);
  }

  retrievePassedObject() {
    return this.passedData;
  }

}
