import { Injectable } from '@angular/core';
import { ProductModel } from './product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: ProductModel,
})
export class ProductsService {

  passedData: any[] = [];
  allData: any[] = [];

  constructor() { }


  additems(item: any){
    this.passedData.push(item);
    // this.allData.next(this.passedData)
    
  }

  retrievePassedObject() {
    return this.passedData;
    
  }
}
