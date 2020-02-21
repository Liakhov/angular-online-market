import { ElementRef } from "@angular/core";

import { MaterialInstance } from "../interface";

declare var M: any

export class MaterialService {

  static toast(message: string){
    return M.toast({html: message})
  }

  static initModal(ref: ElementRef): MaterialInstance{
     return M.Modal.init(ref.nativeElement)
  }

  static resizeTextArea(ref: ElementRef): any{
    return M.textareaAutoResize(ref.nativeElement)
  }

  static initSelect(ref: ElementRef): MaterialInstance{
    return M.FormSelect.init(ref.nativeElement)
  }

  static initSlider(ref: ElementRef): MaterialInstance{
    return M.Carousel.init(ref.nativeElement, {fullWidth: true})
  }

  static initSidenav(ref: ElementRef){
    return M.Sidenav.init(ref.nativeElement)
  }

}
