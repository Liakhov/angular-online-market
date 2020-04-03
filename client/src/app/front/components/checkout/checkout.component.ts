import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import * as models from './../../../shared/interface';
import * as services from './../../../shared/services';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  @ViewChild('modal', {static: false }) modalElem: ElementRef;
  modal: models.MaterialInstance;
  form: FormGroup;

  constructor() {

  }

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.modal = services.MaterialService.initModal(this.modalElem);
  }


  public onSubmit(): void {
    console.log('Submit');
    this.modal.open();
  }

  private createForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      telephone: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      comment: new FormControl(null)
    });
  }

}
