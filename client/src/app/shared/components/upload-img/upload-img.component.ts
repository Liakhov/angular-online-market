import {Component, EventEmitter, Output, Input} from '@angular/core';
import {DndDropEvent} from 'ngx-drag-drop';

import * as models from '../../interface';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss']
})
export class UploadImgComponent {
  @Input() images = [];
  @Output() files: EventEmitter<File[]> = new EventEmitter<File[]>();
  @Output() dndImg: EventEmitter<models.DndMeta> = new EventEmitter<models.DndMeta>();
  @Output() removeImg: EventEmitter<number> = new EventEmitter<number>();

  public onFileUpload(event): void {
    const thumbnails = [...event.target.files];
    this.files.emit(thumbnails);
  }

  public onRemove(img): void {
    const index = this.images.indexOf(img);
    this.removeImg.emit(index);
  }

  public onDrop(event: DndDropEvent): void {
    const dndData = {
      eventIndex: event.index,
      dataIndex: this.images.indexOf(event.data)
    };
    this.dndImg.emit(dndData);
  }
}
