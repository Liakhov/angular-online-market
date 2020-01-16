import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialInstance, MaterialService} from "../../services/material.service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav', {static: true}) sidenavElem: ElementRef
  sidenav: MaterialInstance

  links = [
    {url: '/admin/review', name: 'Обзор'},
    {url: '/admin/order', name: 'Заказы'},
    {url: '/admin/category', name: 'Категории'},
    {url: '/admin/product', name: 'Товары'},
    {url: '/admin/mail', name: 'Подписки'},
    {url: '/admin/message', name: 'Сообщения'}
  ]

  constructor() { }

  ngOnInit() {
    this.sidenav = MaterialService.initSidenav(this.sidenavElem)
  }

  ngOnDestroy(): void {
    if(this.sidenav){
      this.sidenav.destroy()
    }
  }

  openSidenav(event: Event): void{
    event.preventDefault()
    this.sidenav.open()
  }


}
