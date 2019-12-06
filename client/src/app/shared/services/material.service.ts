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

  static initSelect(ref: ElementRef): MaterialInstance{
    return M.FormSelect.init(ref.nativeElement)
  }
}
