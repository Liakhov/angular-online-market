import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../shared/services/category.service";
import {Category} from '../../shared/interface';
import {Observable} from "rxjs";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  search
  cat$: Observable<Category[]>

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.cat$ = this.categoryService.fetch()
  }

}
