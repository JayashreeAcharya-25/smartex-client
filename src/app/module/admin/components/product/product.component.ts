import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SharedService } from '../../../../service/shared-service.service';
import Swal from 'sweetalert2';
import { ProductModel } from './product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['../brand/brand.component.css']
})
export class ProductComponent implements OnInit {

  @ViewChild('ukclose') ukclose: any
  @ViewChild('fileInput') fileInput: any
  @ViewChild('input1')
  el!: ElementRef;

  productObjModel: ProductModel = new ProductModel()

  formValue!: FormGroup
  selectedFile: any

  brands: any
  categories: any
  products: any

  show_add_btn!: boolean
  show_update_btn!: boolean

  pro_color: any = 1
  id: any

  constructor(private api: SharedService, private renderer: Renderer2, private formBuilder: FormBuilder) {
    this.formValue = this.formBuilder.group({
      pro_slno: [''],
      pro_code: [''],
      pro_name: [''],
      pro_image: null,
      pro_desc: [''],
      pro_adinfo: [''],
      pro_tag: [''],
      pro_brand: [''],
      pro_category: [''],
      pro_sgst: [''],
      pro_cgst: [''],
      pro_price: [''],
      pro_shippingcharge: [''],
      pro_qty: [''],
      uid: 1,
    })
  }

  ngOnInit(): void {

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

    this.getProducts();

  }


  onClickAddBtn() {
    this.formValue.reset();
    this.show_add_btn = true;
    this.show_update_btn = false;
  }

  uploadFile(e: any) {
    this.selectedFile = e.target.files[0]
    console.log(this.selectedFile)
  }

  triggerFile() {

    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    this.fileInput.nativeElement.click()
    this.renderer.setStyle(this.fileInput.nativeElement, 'display', 'block');
    
  }

  getProducts() {
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

  addProducts() {
    const formData = new FormData()

    console.log(this.formValue.value)

    formData.append('pro_slno', this.formValue.get('pro_slno')?.value)
    formData.append('pro_code', this.formValue.get('pro_code')?.value)
    formData.append('pro_name', this.formValue.get('pro_name')?.value)
    formData.append('pro_desc', this.formValue.get('pro_desc')?.value)
    formData.append('pro_adinfo', this.formValue.get('pro_adinfo')?.value)
    formData.append('pro_tag', this.formValue.get('pro_tag')?.value)
    formData.append('pro_brand', this.formValue.get('pro_brand')?.value)
    formData.append('pro_category', this.formValue.get('pro_category')?.value)
    formData.append('pro_sgst', this.formValue.get('pro_sgst')?.value)
    formData.append('pro_cgst', this.formValue.get('pro_cgst')?.value)
    formData.append('pro_price', this.formValue.get('pro_price')?.value)
    formData.append('pro_shippingcharge', this.formValue.get('pro_shippingcharge')?.value)
    formData.append('uid', this.formValue.get('uid')?.value)
    formData.append('pro_qty', this.formValue.get('pro_qty')?.value)
    formData.append('pro_color', this.pro_color)
    formData.append('pro_image', this.selectedFile)

    this.api
      .addProduct(formData)
      .subscribe(
        (response: any) => {

          Swal.fire({
            icon: 'success',
            title: '<h3 style="font-size: 18px; font-family: Joan, serif; font-weight: 500 ">'+response.message+'</h3>',
            confirmButtonColor: '#7a0459',
          });
          
          this.getProducts()
          this.ukclose.nativeElement.click()
          
        },
        error =>
          console.log(error)

      )
  }

  editProduct(row: any) {

    this.show_add_btn = false;
    this.show_update_btn = true;

    this.productObjModel.id = row.id
    this.id = this.productObjModel.id

    this.formValue.controls['pro_slno'].setValue(row.pro_slno)
    this.formValue.controls['pro_code'].setValue(row.pro_code)
    this.formValue.controls['pro_name'].setValue(row.pro_name)
    
    this.formValue.controls['pro_desc'].setValue(row.pro_desc)
    this.formValue.controls['pro_adinfo'].setValue(row.pro_adinfo)
    this.formValue.controls['pro_tag'].setValue(row.pro_tag)
    this.formValue.controls['pro_brand'].setValue(row.pro_brand)
    this.formValue.controls['pro_category'].setValue(row.pro_category)
    this.formValue.controls['pro_sgst'].setValue(row.pro_sgst)
    this.formValue.controls['pro_cgst'].setValue(row.pro_cgst)
    this.formValue.controls['pro_price'].setValue(row.pro_price)
    this.formValue.controls['pro_shippingcharge'].setValue(row.pro_shippingcharge)
    this.formValue.controls['uid'].setValue(row.uid)
    this.formValue.controls['pro_qty'].setValue(row.pro_qty)
    this.formValue.controls['pro_image'].setValue(row.pro_image)

    console.log(this.formValue.value)
  }

  updateProducts() {

    console.log(this.id)

    const formData = new FormData()

    formData.append('id', this.id)
    formData.append('pro_slno', this.formValue.get('pro_slno')?.value)
    formData.append('pro_code', this.formValue.get('pro_code')?.value)
    formData.append('pro_name', this.formValue.get('pro_name')?.value)
    formData.append('pro_desc', this.formValue.get('pro_desc')?.value)
    formData.append('pro_adinfo', this.formValue.get('pro_adinfo')?.value)
    formData.append('pro_tag', this.formValue.get('pro_tag')?.value)
    formData.append('pro_brand', this.formValue.get('pro_brand')?.value)
    formData.append('pro_category', this.formValue.get('pro_category')?.value)
    formData.append('pro_sgst', this.formValue.get('pro_sgst')?.value)
    formData.append('pro_cgst', this.formValue.get('pro_cgst')?.value)
    formData.append('pro_price', this.formValue.get('pro_price')?.value)
    formData.append('pro_shippingcharge', this.formValue.get('pro_shippingcharge')?.value)
    formData.append('uid', this.formValue.get('uid')?.value)
    formData.append('pro_qty', this.formValue.get('pro_qty')?.value)
    formData.append('pro_color', this.pro_color)
    formData.append('pro_image', this.selectedFile)

    this.api
      .updateProduct(formData)
      .subscribe(
        (response: any) => {

          Swal.fire({
            icon: 'success',
            title: '<h3 style="font-size: 18px; font-family: Joan, serif; font-weight: 500 ">'+response.message+'</h3>',
            confirmButtonColor: '#7a0459',
          });

          console.log(response.data)
          this.getProducts();
          // window.setTimeout(function(){location.reload()}, 1000)
          this.ukclose.nativeElement.click()

        },
        error =>
          console.log(error)

      )
  }

  deleteProducts(id: any) {

    this.api
      .deleteProduct(id)
      .subscribe((response: any) => {
        Swal.fire({
          icon: 'success',
          title: response.message,
        });
        
        this.getProducts()
      })

  }

}
