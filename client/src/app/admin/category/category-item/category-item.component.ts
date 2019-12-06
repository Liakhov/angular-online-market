import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../shared/services/category.service";
import {Category, Product} from "../../../shared/interface";
import {switchMap} from "rxjs/operators";
import {Observable, of} from 'rxjs';
import {MaterialService} from "../../../shared/services/material.service";

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss']
})
export class CategoryItemComponent implements OnInit {

  @ViewChild('inputImage', {static: false}) inputImage: ElementRef
  @ViewChild('textarea', {static: false}) textarea: ElementRef
  isNew: boolean
  form: FormGroup
  category: Category
  image: File
  imagePreview
  products$: Observable<Product[]>
  catId: string

  constructor(private router: Router, private CategoryService: CategoryService, private activeRouter: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null)
    })

    if(this.router.url === '/admin/category/new'){
      this.isNew = true;
    }else{
      this.activeRouter.params
        .pipe(
          switchMap(
            (params: Params) => {
              this.form.disable()
              if(params['id']){
                this.isNew = false
                this.catId = params['id']
                return this.CategoryService.getByID(params['id'])
              }
              return of(null)
            }
          )
        )
        .subscribe(category => {
          if(category){
            this.category = category
            this.form.patchValue({
              name: category.name,
              description: category.description
            })

            $('#descr').trigger('autoresize');

            if(category.image){
              this.imagePreview = category.image
            }
            this.form.enable()
          }
        },
        error => {
          console.log(error)
        })
    }

      this.products$ = this.CategoryService.getAllFromCategory(this.catId)
  }

  onFileUpload(event){
    const target = event.target
    const file = target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () =>  this.imagePreview = reader.result

    reader.readAsDataURL(file)
  }

  onSubmit(){
      let obs$

      if(this.isNew){
        obs$ = this.CategoryService.create(this.form.value.name, this.form.value.description, this.image)
      }else{
        obs$ = this.CategoryService.update(this.category._id, this.form.value.name, this.form.value.description, this.image)
      }

      obs$.subscribe(data => {

        if(this.isNew){
          MaterialService.toast(data.message)
          this.router.navigate(['/admin/category/'])
        }else{
          MaterialService.toast('Изменения сохранены')
        }
      })
  }

  remove(){
    this.CategoryService.remove(this.category._id).subscribe(data => {
      MaterialService.toast(data.message)
      this.router.navigate(['/admin/category/'])
    })
  }
}