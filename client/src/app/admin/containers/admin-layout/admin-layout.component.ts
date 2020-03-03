import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MaterialService } from "../../../shared/services/material.service";
import { MaterialInstance } from "../../../shared/interface";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

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