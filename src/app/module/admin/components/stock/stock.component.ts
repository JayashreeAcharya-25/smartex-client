import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SharedService } from 'src/app/shared-service.service';
import Swal from 'sweetalert2';
import { StockModel } from './stock.model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['../brand/brand.component.css']
})
export class StockComponent implements OnInit {

  @ViewChild('ukclose') ukclose: any
  @ViewChild('fileInput') fileInput: any

  stockObjModel: StockModel = new StockModel()

  formValue: FormGroup
  selectedFile!: any

  show_add_btn!: boolean
  show_update_btn!: boolean

  products: any
  stocks: any

  id: any

  constructor( private api: SharedService, private formBuilder: FormBuilder) {
    this.formValue = this.formBuilder.group({
      stk_slno: [''],
      stk_pro_id: [''],
      stk_qty: [''],
      stk_status: [''],
    })
   }

  ngOnInit(): void {

    this.getStocks()

    this.api
      .getProduct()
      .subscribe(
        (response: any) => {
          this.products = response.data,
          console.log(response.data)
        },
        error => console.log(error)

      )
    
  }

  onClickAddBtn() {
    this.formValue.reset();
    this.show_add_btn = true;
    this.show_update_btn = false;
  }

  getStocks() {

    this.api
      .getStock()
      .subscribe(
        (response: any) => {
          this.stocks = response.data,
          console.log(response.data)
        },
        error => console.log(error)
      )
  }

  addStocks() {
    
    this.api
        .addStock(this.formValue.value)
        .subscribe(
          (response: any) => {
            
            Swal.fire({
              icon: 'success',
              title: '<h3 style="font-size: 18px; font-family: Joan, serif; font-weight: 500 ">'+response.message+'</h3>',
              confirmButtonColor: '#7a0459',
            });

            console.log(response);

            this.getStocks()
            this.ukclose.nativeElement.click()
          },
          error => {
            console.log(error);
          }
        )
  }

  editStocks(row: any){

    this.show_add_btn = false;
    this.show_update_btn = true;

    this.stockObjModel.id = row.id
    this.id = this.stockObjModel.id

    this.formValue.controls['stk_slno'].setValue(row.stk_slno)
    this.formValue.controls['stk_pro_id'].setValue(row.stk_pro_id)
    this.formValue.controls['stk_qty'].setValue(row.stk_qty)
    this.formValue.controls['stk_status'].setValue(row.stk_status)

  }

  updateStocks(){

    this.api
      .updateStock(this.formValue.value)
      .subscribe(
        (response: any) => {

          Swal.fire({
            icon: 'success',
            title: '<h3 style="font-size: 18px; font-family: Joan, serif; font-weight: 500 ">'+response.message+'</h3>',
            confirmButtonColor: '#7a0459',
          });

          console.log(response.data)
          // window.setTimeout(function(){location.reload()}, 1000)
          this.getStocks()
          this.ukclose.nativeElement.click()

        },
        error =>
          console.log(error)

      )
  }

  deleteStocks(id: any) {

    this.api
      .deleteStock(id)
      .subscribe((response: any) => {

        Swal.fire({
          icon: 'success',
          title: '<h3 style="font-size: 18px; font-family: Joan, serif; font-weight: 500 ">'+response.message+'</h3>',
          confirmButtonColor: '#7a0459',
          
        });
        
        this.getStocks()
      })

  }

}
