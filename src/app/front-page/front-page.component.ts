import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  devices = 'one two three'.split(' ');

  constructor() { }

  ngOnInit() {
  }


onChange(deviceValue) {
    console.log(deviceValue);
}


}