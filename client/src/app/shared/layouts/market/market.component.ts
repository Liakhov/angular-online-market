import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  showMenu: boolean = false

  constructor() { }

  ngOnInit() {

  }

  dropdown(){
    this.showMenu = !this.showMenu;
  }

}
