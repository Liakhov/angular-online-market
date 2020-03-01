import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss']
})
export class UploadImgComponent {
  @Output() files = new EventEmitter();
  thumbnails
  thumbnailsPreview = []

  constructor() { }

  onFileUpload(event) {
    this.thumbnails = [...event.target.files];

    const filesAmount = this.thumbnails.length;
    for (let i = 0; i < filesAmount; i++) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.thumbnailsPreview.push(e.target.result);
      }

      reader.readAsDataURL(this.thumbnails[i]);
    }
    this.files.emit(this.thumbnails);
  }
}
