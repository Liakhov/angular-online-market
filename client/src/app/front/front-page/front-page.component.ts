import {Component, OnInit} from '@angular/core';
import {Category} from "../../shared/interface";
import {CategoryService} from "../../shared/services/category.service";
import {Observable} from "rxjs";

declare var M

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  categories: Observable<Category[]> = this.categoriesService.fetch()


  constructor(private categoriesService: CategoryService) { }

  ngOnInit() {

  }


}
