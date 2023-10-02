import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[dgtNavigationTarget]'
})
export class NavigationTargetDirective {


  constructor(private el: ElementRef) {}

  // -- validate that input contains only numbers and point
  @HostListener('keydown', ['$event'])
  validateInput(event: KeyboardEvent): void {
    const regex: RegExp = new RegExp(/^[0-9.]+$/);

    let current: string = this.el.nativeElement.value;

    if (!regex.test(current)) {
      event.preventDefault()
    }
  }


}
