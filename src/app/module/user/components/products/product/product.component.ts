import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared-service.service';
import { ProductsService } from '../products.service';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  selectedProducts: any = [];
  stocks: any = []
  itemCategory: any
  categories: any = []

  constructor(private _service: ProductsService, private _product_service: ProductService, private api: SharedService, private route: ActivatedRoute, private router: Router) { 
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    
    this.api
      .getStock()
      .subscribe(
        (response: any) => {
          this.stocks = response.data,
          console.log(response.data)
        },
        error => console.log(error)
      )
    
    const item = localStorage.getItem('products')
    if(item){
      try{
        this.selectedProducts = JSON.parse(item)
      } catch(e) {}
    } 
      
      
  }

  increment_qty(item: any) {

    this.selectedProducts.find((i: any) => {
      i.id === item.id;
    });
    item.pro_qty = item.pro_qty + 1;
    
  }

  decrement_qty(item: any) {

    // (this.qty == 1) ? this.qty : --this.qty;
    this.selectedProducts.find((i: any) => {
      i.id === item.id;
    });
    (item.pro_qty === 1) ? item.pro_qty : item.pro_qty = item.pro_qty - 1;

  }

  addToBasket(){
    this._product_service.additems(this.selectedProducts)
    console.log(this.selectedProducts)
  }


}
