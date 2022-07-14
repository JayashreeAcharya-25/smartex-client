import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SharedService } from 'src/app/shared-service.service';
import Swal from 'sweetalert2';
import { BrandModel } from './brand.model';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})

export class BrandComponent implements OnInit {

  @ViewChild('ukclose') ukclose: any

  brandObjModel: BrandModel = new BrandModel()

  formValue: FormGroup
  selectedFile!: any

  show_add_btn!: boolean
  show_update_btn!: boolean

  brands: any

  id: any

  constructor( private api: SharedService, private formBuilder: FormBuilder) {
    this.formValue = this.formBuilder.group({
      brand_slno: [''],
      brand_name: [''],
      brand_image: [null],
    })
   }

  ngOnInit(): void {

    this.getBrands()
    
  }

  onClickAddBtn() {
    this.formValue.reset();
    this.show_add_btn = true;
    this.show_update_btn = false;
  }

  uploadFile(event: any){
    this.selectedFile = event.target.files[0]
    console.log(this.selectedFile)
  }

  triggerFile() {
    let ref = document.getElementById('fileInput')
    ref?.click()
  }

  getBrands() {
    this.api
      .getBrand()
      .subscribe(
        (response: any) => {
          this.brands = response.data,
          console.log(response.data)
        },
        error => console.log(error)

      )
  }

  addBrands() {

    const formData = new FormData();
    
    formData.append('brand_slno', this.formValue.get('brand_slno')?.value);
    formData.append('brand_name', this.formValue.get('brand_name')?.value);
    formData.append('brand_image', this.selectedFile)
    
    this.api
        .addBrand(formData)
        .subscribe(
          (response: any) => {
            
            Swal.fire({
              icon: 'success',
              title: response.message,
            });
            console.log(response);

            this.getBrands()
            this.ukclose.nativeElement.click()
          },
          error => {
            console.log(error);
          }
        )
  }

  editBrand(row: any){

    this.show_add_btn = false;
    this.show_update_btn = true;

    this.brandObjModel.id = row.id
    this.id = this.brandObjModel.id

    this.formValue.controls['brand_slno'].setValue(row.brand_slno)
    this.formValue.controls['brand_name'].setValue(row.brand_name)
    this.formValue.controls['brand_image'].setValue(row.brand_image)

  }

  updateBrands(){

    console.log(this.id)

    const formData = new FormData();

    formData.append('brand_slno', this.formValue.get('brand_slno')?.value);
    formData.append('brand_name', this.formValue.get('brand_name')?.value);
    formData.append('brand_image', this.selectedFile)

    this.api
      .updateBrand(formData)
      .subscribe(
        (response: any) => {
          // Swal.fire({
          //   icon: 'success',
          //   title: response.message,
          // });
          console.log(response)
          // window.setTimeout(function(){location.reload()}, 1000)
          // this.ukclose.nativeElement.click()

        },
        error =>
          console.log(error)

      )
  }

  deleteBrands(id: any) {

    this.api
      .deleteBrand(id)
      .subscribe((response: any) => {
        Swal.fire({
          icon: 'success',
          title: response.message,
        });
        
        this.getBrands()
      })

  }





}

