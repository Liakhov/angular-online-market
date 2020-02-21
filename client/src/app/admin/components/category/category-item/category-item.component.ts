import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { switchMap } from "rxjs/operators";
import { Observable, of, Subscription } from 'rxjs';

import * as services from '../../../../shared/services/index';
import * as models from '../../../../shared/interface';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss']
})
export class CategoryItemComponent implements OnInit, OnDestroy {

  @ViewChild('inputImage', {static: false}) inputImage: ElementRef
  @ViewChild('textarea', {static: false}) textarea: ElementRef
  isNew: boolean
  form: FormGroup
  category: models.Category
  image: File
  imagePreview
  products$: Observable<models.Product[]>
  oSub: Subscription
  removeSub: Subscription
  catId: string

  constructor(private router: Router, private CategoryService: services.CategoryService, private activeRouter: ActivatedRoute) { }

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

            services.MaterialService.resizeTextArea(this.textarea)

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

  ngOnDestroy(): void {
    if(this.oSub) this.oSub.unsubscribe()
    if(this.removeSub) this.removeSub.unsubscribe()
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

      this.oSub = obs$.subscribe(data => {

        if(this.isNew){
          services.MaterialService.toast(data.message)
          this.router.navigate(['/admin/category/'])
        }else{
          services.MaterialService.toast('Изменения сохранены')
        }
      })
  }

  remove(){
    this.removeSub = this.CategoryService.remove(this.category._id).subscribe(data => {
      services.MaterialService.toast(data.message)
      this.router.navigate(['/admin/category/'])
    })
  }
}
