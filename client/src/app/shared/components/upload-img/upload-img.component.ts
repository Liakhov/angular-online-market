import {Component, EventEmitter, Output, Input} from '@angular/core';
import {DndDropEvent} from 'ngx-drag-drop';


@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss']
})
export class UploadImgComponent {
  @Input() images = [];
  @Output() files: EventEmitter<File[]> = new EventEmitter();
  @Output() imagesChanges = new EventEmitter();

  public onFileUpload(event): void {
    const thumbnails = [...event.target.files];
    for (const img of thumbnails) {
      const reader = new FileReader();
      reader.onload = () => this.images.push(reader.result);
      reader.readAsDataURL(img);
    }
    this.files.emit(thumbnails);
  }

  public onRemove(img): void {
    const index = this.images.indexOf(img);
    this.images.splice(index, 1);
    this.imagesChanges.emit(this.images);
  }

  public onDrop(event: DndDropEvent): void {
    const index = this.images.indexOf(event.data);
    this.images.splice(index, 1);
    this.images.splice(event.index, 0, event.data);
    this.imagesChanges.emit(this.images);
  }
}
