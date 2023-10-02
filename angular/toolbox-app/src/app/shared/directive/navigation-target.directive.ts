import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[dgtNavigationTarget]'
})
export class NavigationTargetDirective {
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'Delete', 'Del', 'ArrowLeft', 'ArrowRight', 'Left', 'Right'];

  constructor(private el: ElementRef) {
  }

  // -- validate that input contains only numbers and point
  @HostListener('keydown', ['$event'])
  validateInput(event: KeyboardEvent): void {
    // -- CTRL/CMD/SHIFT/ALT
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }

    // -- special keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    const regex: RegExp = new RegExp(/^[0-9.]+$/);

    let current: string = this.el.nativeElement.value + event.key;

    console.log(current);
    console.log(regex.test(current));

    if (!regex.test(current)) {
      event.preventDefault()
    }
  }


}
