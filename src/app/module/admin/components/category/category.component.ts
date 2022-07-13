import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SharedService } from 'src/app/shared-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['../brand/brand.component.css']
})
export class CategoryComponent implements OnInit {

  @ViewChild('ukclose') ukclose: any

  formValue!: FormGroup

  brands: any
  categories: any

  constructor(private api: SharedService, private formBuilder: FormBuilder) { 
    this.formValue = this.formBuilder.group({
      cat_slno: [''],
      cat_name: [''],
      cat_brand: [''],
    })
  }

  ngOnInit(): void {
    
    this.api
        .getBrand()
        .subscribe(
          (response: any)=>{
            this.brands = response.data
            console.log(this.brands)
          },
          error =>{
            console.log(error)
          }
        )

    this.api
      .getCategory()
      .subscribe(
        (response: any)=>{
          
          this.categories = response.data
          console.log(this.categories)
        },
        error =>{
          console.log(error)
        }
      )
  }

  addCategories(){
    console.log(this.formValue.value)
    this.api
        .addCategory(this.formValue.value)
        .subscribe(
          (response: any) =>{
            
            Swal.fire({
              icon: 'success',
              title: response.message,
            });
            window.setTimeout(function(){location.reload()}, 1000)
            this.ukclose.nativeElement.click()
          },
          error => {
            console.log(error);
          }
        )
  }

}
