import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../shared/layouts/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private category: CategoryService) { }

  ngOnInit() {
    this.category.get().subscribe( (data) => {
      console.log(data); 
    } )
      
  }

}