import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SharedService } from 'src/app/shared-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})

export class BrandComponent implements OnInit {

  @ViewChild('ukclose') ukclose: any

  formValue: FormGroup
  selectedFile!: any
  get_res_data: any
  brands: any

  constructor( private api: SharedService, private formBuilder: FormBuilder) {
    this.formValue = this.formBuilder.group({
      brand_slno: [''],
      brand_name: [''],
      brand_image: [null],
    })
   }

  ngOnInit(): void {
    this.api
        .getBrand()
        .subscribe(
          response =>{
            this.get_res_data = response
            this.brands = this.get_res_data.data
            console.log(this.brands)
          },
          error =>{
            console.log(error)
          }
        )
  }

  uploadFile(event: any){
    this.selectedFile = event.target.files[0]
    console.log(this.selectedFile)
  }



  addBrands() {

    const formData = new FormData();
    console.log(this.formValue)

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

            window.setTimeout(function(){location.reload()}, 1000)
            this.ukclose.nativeElement.click()
          },
          error => {
            console.log(error);
          }
        )
  }

}

