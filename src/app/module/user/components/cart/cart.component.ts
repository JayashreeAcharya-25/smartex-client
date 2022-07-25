import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared-service.service';
import { environment } from 'src/environments/environment';
import { ProductService } from '../products/product/product.service';
import { ProductsService } from '../products/products.service';
ProductService

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  // providers: [ProductsService]
})

export class CartComponent implements OnInit {

  qty: any
  amt: any
  id: any
  selectedProducts: any = [];
  product: any = []
  total: number = 0;
  sgst: number = 2 / 100;
  cgst: number = 2 / 100;
  shippingcharges: any
  netPrice: number = 0;
    rzp1:any

  constructor(private _service: ProductsService, private _product_service: ProductService, private api:SharedService) {

  }
  
  options = {
    "key": environment.razorpay, // Enter the Key ID generated from the Dashboard
    "amount": "100", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Test Corp",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    "prefill": {
      "name": "Jayashree",
      "email": "jayaacharya1997@gmail.com",
      "contact": "9741568375"
    },
    "notes": {
      "address": "Corporate Office"
    },
    "theme": {
      "color": "#7a0459"
    }
  };

  ngOnInit() {

    this.selectedProducts = this._service.retrievePassedObject()
    
    // this.product = this._product_service.retrieveItems()[0]
    // this.selectedProducts = [...this.product]
    console.log(this.selectedProducts)
    
    this.selectedProducts.find((sc: any)=>{
      this.shippingcharges =  sc.pro_shippingcharge
    })

    this.grandTotal();
    this.netAmt();
  }

  increment_qty(item: any) {

    this.selectedProducts.find((i: any) => {
      i.id === item.id;
      i.pro_price === item.pro_price;
    });
    item.pro_qty = item.pro_qty + 1;
    this.grandTotal()
    this.netAmt()
  }

  decrement_qty(item: any) {

    // (this.qty == 1) ? this.qty : --this.qty;
    this.selectedProducts.find((i: any) => {
      i.id === item.id;
      i.pro_price === item.pro_price;
    });
    (item.pro_qty === 1) ? item.pro_qty : item.pro_qty = item.pro_qty - 1;

    this.grandTotal()
    this.netAmt()

  }

  remove(item: any) {
    const index = this.selectedProducts.indexOf(item)
    this.selectedProducts.splice(index, 1)
    this.grandTotal()
    this.netAmt()
    console.log(this.selectedProducts)
  }

  grandTotal() {
    this.total = this.selectedProducts.reduce(function (acc: number, val: { pro_price: number; pro_qty: number; }) {
      return acc + (val.pro_price * val.pro_qty)
    }, 0)
  }

  netAmt() {
    this.netPrice = this.total + this.cgst + this.sgst + this.shippingcharges
  }

  pay() {
    this.rzp1 = new this.api.nativeWindow.Razorpay(this.options);
    this.rzp1.open()
  }


}


