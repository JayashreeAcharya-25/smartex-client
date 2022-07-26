import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SharedService } from 'src/app/service/shared-service.service';
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
            title: '<h3 style="font-size: 18px; font-family: Joan, serif; font-weight: 500 ">'+response.message+'</h3>',
            confirmButtonColor: '#7a0459',
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

    let data = new FormData()
    data.append('id', this.id)
    data.append('cat_slno', this.formValue.get('cat_slno')?.value)
    data.append('cat_name', this.formValue.get('cat_name')?.value)
    data.append('cat_brand', this.formValue.get('cat_brand')?.value)

    this.api
      .updateCategory(data)
      .subscribe(
        (response: any) => {

          Swal.fire({
              icon: 'success',
              title: '<h3 style="font-size: 18px; font-family: Joan, serif; font-weight: 500 ">'+response.message+'</h3>',
              confirmButtonColor: '#7a0459',
            });

          console.log(response)
          // window.setTimeout(function(){location.reload()}, 1000)
          this.getCategories()
          this.ukclose.nativeElement.click()

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
