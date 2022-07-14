import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SharedService } from 'src/app/shared-service.service';
import Swal from 'sweetalert2';
import { CategoryModel } from './category.models';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['../brand/brand.component.css']
})
export class CategoryComponent implements OnInit {

  @ViewChild('ukclose') ukclose: any

  categoryObjModel: CategoryModel = new CategoryModel()

  formValue!: FormGroup

  brands: any
  categories: any

  show_add_btn!: boolean
  show_update_btn!: boolean

  id: any

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
        (response: any) => this.brands = response.data,
        error => console.log(error)
      )

    this.getCategories()
  }

  onClickAddBtn() {
    this.formValue.reset();
    this.show_add_btn = true;
    this.show_update_btn = false;
  }

  getCategories() {
    this.api
      .getCategory()
      .subscribe(
        (response: any) => this.categories = response.data,
        error => console.log(error)
      )
  }

  addCategories() {
    
    this.api
      .addCategory(this.formValue.value)
      .subscribe(
        (response: any) => {

          Swal.fire({
            icon: 'success',
            title: response.message,
          });
          this.getCategories()
          this.ukclose.nativeElement.click()
        },
        error => {
          console.log(error);
        }
      )
  }

  editCategories(row: any){
    this.show_add_btn = false;
    this.show_update_btn = true;

    this.categoryObjModel.id = row.id
    this.id = this.categoryObjModel.id

    this.formValue.controls['cat_slno'].setValue(row.cat_slno)
    this.formValue.controls['cat_name'].setValue(row.cat_name)
    this.formValue.controls['cat_brand'].setValue(row.cat_brand)
  }

  updateCategories(){

    this.api
      .updateCategory(this.formValue.value)
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

  deleteCategories(id: any){
    this.api
      .deleteCategory(id)
      .subscribe((response: any) => {
        Swal.fire({
          icon: 'success',
          title: response.message,
        });
        
        this.getCategories()
      })
  }

}
