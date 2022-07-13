import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared-service.service';
import { ProductsService } from '../products/products.service';

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
  total: number = 0;
  sgst: number = 2 / 100;
  cgst: number = 2 / 100;
  netPrice: number = 0;

  constructor(private _service: ProductsService, private api:SharedService) {

  }

  options = {
    "key": "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
    "amount": "2", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Acme Corp",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    "prefill": {
      "name": "Gaurav Kumar",
      "email": "gaurav.kumar@example.com",
      "contact": "9999999999"
    },
    "notes": {
      "address": "Razorpay Corporate Office"
    },
    "theme": {
      "color": "#3399cc"
    }
  };

  ngOnInit() {

    this.selectedProducts = this._service.retrievePassedObject()
    console.log("Products", this.selectedProducts)

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
    console.log(this.selectedProducts)
  }

  grandTotal() {
    this.total = this.selectedProducts.reduce(function (acc: number, val: { pro_price: number; pro_qty: number; }) {
      return acc + (val.pro_price * val.pro_qty)
    }, 0)
  }

  netAmt() {
    this.netPrice = this.total + this.cgst + this.sgst
  }
  rzp1:any
  pay() {
    this.rzp1 = new this.api.nativeWindow.Razorpay(this.options);
    this.rzp1.open()
  }


}


