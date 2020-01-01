import {ElementRef} from "@angular/core";


declare var M: any

export interface MaterialInstance {
  open?(): void
  close?(): void
  destroy?(): void
}

export class MaterialService {

  static toast(message: string){
    return M.toast({html: message})
  }

  static initModal(ref: ElementRef): MaterialInstance{
     return M.Modal.init(ref.nativeElement)
  }

  static updateInput(){
    M.updateTextFields();
  }

  static resizeTextArea(ref: ElementRef): any{
    return M.textareaAutoResize(ref.nativeElement)
  }

  static initSelect(ref: ElementRef): MaterialInstance{
    return M.FormSelect.init(ref.nativeElement)
  }

  static initSlider(ref: ElementRef): MaterialInstance{
    return M.Carousel.init(ref.nativeElement)
  }

  static initSidenav(ref: ElementRef){
    return M.Sidenav.init(ref.nativeElement)
  }

  static initDatePicker(ref: ElementRef){
    return M.Datepicker.init(ref.nativeElement)
  }

}
