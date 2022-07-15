import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  passedData: any = [];

  constructor() { }


  additems(item: any){
    this.passedData.push(item);
    // this.allData.next(this.passedData)
    
  }

  retrieveItems() {
    return this.passedData;
    
  }
}
