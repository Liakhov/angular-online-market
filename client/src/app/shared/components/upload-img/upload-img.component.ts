import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss']
})
export class UploadImgComponent {
  @Input() images = []
  @Output() files = new EventEmitter()
  @Output() imgs = new EventEmitter()
  thumbnails

  constructor() { }

  public onFileUpload(event): void {
    this.thumbnails = [...event.target.files];
    for(const img of this.thumbnails){
      const reader = new FileReader();
      reader.onload = () => this.images.push(reader.result);
      reader.readAsDataURL(img);
    }
    this.files.emit(this.thumbnails);
  }

  public onRemove(img): void {
    const index = this.images.indexOf(img)
    this.images.splice(index, 1)
    this.imgs.emit(this.images)
  }
}
