import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Category} from "../../shared/interface";
import {CategoryService} from "../../shared/services/category.service";
import {Observable} from "rxjs";
import {MaterialInstance, MaterialService} from "../../shared/services/material.service";

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})

export class FrontPageComponent implements OnInit, AfterViewInit, OnDestroy{

  categories: Observable<Category[]>
  @ViewChild('slider', {static: false}) sliderBlock: ElementRef
  slider: MaterialInstance

  constructor(private categoriesService: CategoryService) { }

  ngOnInit() {
    this.categories = this.categoriesService.fetch()
  }

  ngAfterViewInit(){
    this.slider = MaterialService.initSlider(this.sliderBlock)
  }

  ngOnDestroy(): void {
    if(this.slider){
      this.slider.destroy()
    }
  }


}
