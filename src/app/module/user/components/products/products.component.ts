import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared-service.service';
import {ProductModel} from './product.model'
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  // providers: [ProductsService]
})
export class ProductsComponent implements OnInit {

  formvalue!: FormGroup

  selectedBrand: any
  selectedCategory: any
  searchedKeyword: any;
  
  products:any = []
  brands: any
  categories:any
  filterproduct: any;
  count: any = 0
  itemCategory:any 

  productObjModel: ProductModel = new ProductModel()

  constructor(private formBuilder: FormBuilder, private _service: ProductsService, private api:SharedService,private router: Router) { 
    this.formvalue = this.formBuilder.group({
      id: [''],
      pro_name: [''],
      pro_price: [''],
      pro_qty: [''],
      pro_shippingcharge: [''],
    })
  }

  ngOnInit() {

    this.api
      .getProduct()
      .subscribe((response: any)=>{
        this.products = response.data
        this.filterproduct = [...this.products]
        console.log(response)
      }, error =>{
        console.log(error)
      })

      this.api
        .getBrand()
        .subscribe(
          (response: any) => this.brands = response.data,
          error => console.log(error)
        )

    this.api
      .getCategory()
      .subscribe(
        (response: any) => this.categories = response.data,
        error => console.log(error)
      )

    // this.count = this._cart.returnitemcount()
    // console.log(this.count)
  }

  addToCart(product: any){

    this.productObjModel.id = product.id;
    this.formvalue.controls['id'].setValue(product.id)
    this.formvalue.controls['pro_name'].setValue(product.pro_name)
    this.formvalue.controls['pro_price'].setValue(product.pro_price)
    this.formvalue.controls['pro_qty'].setValue(product.pro_qty)
    this.formvalue.controls['pro_shippingcharge'].setValue(product.pro_shippingcharge)
    console.log(this.formvalue.value)
    ++this.count;

    this._service.additems(this.formvalue.value)
    
  }

  getProductData(product: any){

    this.productObjModel.id = product.id;
    const data = {
      id: product.id,
      pro_name: product.pro_name,
      pro_desc: product.pro_desc,
      pro_adinfo: product.pro_adinfo,
      pro_image: product.pro_image,
      pro_category: product.pro_category,
      pro_brand: product.pro_brand,
      pro_tag: product.pro_tag,
      pro_price: product.pro_price,
      pro_shippingcharge: product.pro_shippingcharge,
      pro_qty: product.pro_qty,

    }
    // this.formvalue.controls['id'].setValue(product.id)
    // this.formvalue.controls['pro_name'].setValue(product.pro_name)
    // this.formvalue.controls['pro_price'].setValue(product.pro_price)
    // this.formvalue.controls['pro_qty'].setValue(product.pro_qty)
    // this.formvalue.controls['pro_desc'].setValue(product.pro_desc)
    // this.formvalue.controls['pro_image'].setValue(product.pro_image)
    // this.formvalue.controls['pro_category'].setValue(product.pro_category)
    // console.log(this.formvalue.value)

    this._service.sendProductData(data)
    
  }

  filterByDropdown(){
    this.filterproduct = [...this.products.filter(
      (product: any) => 
        product.pro_brand === this.selectedBrand
        &&
        product.pro_category === this.selectedCategory
    )]
  }

  // filterBySearch(){
  //   this.filterproduct = this.products.filter((val) =>
  //     val.name.toLowerCase().includes(value)
  //   );
  // }



  


}
