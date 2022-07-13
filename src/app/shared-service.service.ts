import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

function _window(): any {
  return window;
}


@Injectable({
  providedIn: 'root'
})

export class SharedService {

  get nativeWindow(): any{
    return _window()
  }

  APIUrl = "http://127.0.0.1:8000/v1"
  product = '/product'

  constructor(private http: HttpClient) { }

  signUp(val: any){
    return this.http
      .post(this.APIUrl + '/user/register', val)
  }

  login(val: any){
    return this.http
      .post(this.APIUrl + '/user/login', val)
  }

  user(){
    return this.http
      .get(this.APIUrl + '/user/getuser')
  }

  logout(val: any){
    return this.http
      .post(this.APIUrl + '/user/logout', val)
  }


  addBrand(val: any) {
    return this.http
      .post(this.APIUrl + '/brand/addbrand', val)
  }

  getBrand() {
    return this.http
      .get(this.APIUrl + '/brand/getbrand')
  }

  addCategory(val:any){
    return this.http
      .post(this.APIUrl + '/category/addcategory', val)
  }

  getCategory(){
    return this.http
      .get(this.APIUrl + '/category/getcategory')
  }

  addProduct(val:any){
    return this.http
      .post(this.APIUrl + this.product + '/addproduct', val)
  }

  getProduct(){
    return this.http
      .get(this.APIUrl + this.product + '/getproduct')
  }

  updateProduct(val: any){
    return this.http
      .put(this.APIUrl + this.product + `/updateproduct`, val)
  }

  deleteProduct(id: any){
    return this.http
      .delete(this.APIUrl + this.product + `/deleteproduct/${id}`)
  }
}
