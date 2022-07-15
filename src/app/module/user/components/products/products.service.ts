import { Injectable } from '@angular/core';
import { ProductModel } from './product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: ProductModel,
})
export class ProductsService {

  passedData: any[] = [];
  productData: any[] = [];

  constructor() { }


  additems(item: any){
    this.passedData.push(item);
    // this.allData.next(this.passedData)
    
  }

  retrievePassedObject() {
    return this.passedData;
    
  }

  sendProductData(product: any){
    if(this.productData.length == 0){
      this.productData.push(product);
      localStorage.setItem('products', JSON.stringify(this.productData))
    } else{
      this.productData;
    }
    // this.productData.concat(product)
    // localStorage.setItem('products', JSON.stringify(this.productData))
  }

  retrieveProductData(){
    return this.productData;
  }
  

}
