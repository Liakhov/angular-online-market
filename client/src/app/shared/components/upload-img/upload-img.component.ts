import {Component, EventEmitter, Output, Input, OnChanges, SimpleChange} from '@angular/core';
import {DndDropEvent} from 'ngx-drag-drop';


@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss']
})
export class UploadImgComponent {
  public thumbnails = [];
  @Input() images = [];
  @Output() files: EventEmitter<File[]> = new EventEmitter<File[]>();
  @Output() onDndImg = new EventEmitter();
  @Output() onRemoveImg: EventEmitter<number> = new EventEmitter<number>();


  get someImages() {
    const test = [...this.images];

    return test;
  }

  // ngOnChanges(changes: {[images: string]: SimpleChange}) {
  //   this.images = changes.images.currentValue;
  //   this.thumbnails = [];
  //
  //   if (this.images.length > 0) {
  //     this.images.forEach(i => {
  //       if (i instanceof File) {
  //           const reader = new FileReader();
  //           reader.onload = () => this.thumbnails.push(reader.result);
  //           reader.readAsDataURL(i);
  //       } else {
  //         this.thumbnails.push(i);
  //       }
  //     });
  //   }
  // }

  public onFileUpload(event): void {
    const thumbnails = [...event.target.files];
    console.log(thumbnails);
    // for (const img of thumbnails) {
    //   const reader = new FileReader();
    //   reader.onload = () => this.images.push(reader.result);
    //   reader.readAsDataURL(img);
    // }
    this.files.emit(thumbnails);
  }

  public onRemove(img): void {
    const index = this.images.indexOf(img);
    this.onRemoveImg.emit(index);
  }

  public onDrop(event: DndDropEvent): void {
    const dndData = {
      eventIndex: event.index,
      dataIndex: this.images.indexOf(event.data)
    };
    this.onDndImg.emit(dndData);
  }
}
