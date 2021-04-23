import {Component, OnInit} from '@angular/core';
import {take} from 'rxjs/operators';

import * as services from '../../services';
import * as sharedServices from '../../../shared/services';
import * as models from '../../../shared/interface';

@Component({
  selector: 'app-brand-container',
  templateUrl: './brand-container.component.html',
  styleUrls: ['./brand-container.component.scss']
})
export class BrandContainerComponent implements OnInit {
  public brands: models.Brand[] = [];
  public search: string;

  constructor(private brandService: services.BrandService) {
  }

  async ngOnInit(): Promise<void> {
    await this.fetch();
  }

  private async fetch(): Promise<void> {
    try {
      this.brands = await this.brandService.fetch().pipe(take(1)).toPromise();
    } catch (e) {
      sharedServices.MaterialService.toast(e.message);
    }
  }
}
