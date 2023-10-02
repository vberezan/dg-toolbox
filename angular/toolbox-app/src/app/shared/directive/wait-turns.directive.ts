import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[dgtWaitTurns]'
})
export class WaitTurnsDirective {
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'Delete', 'Del', 'ArrowLeft', 'ArrowRight', 'Left', 'Right'];
  private regex: RegExp = new RegExp(/^[0-9]+$/);

  constructor(private el: ElementRef) {}

  // -- validate that input contains only numbers and point
  @HostListener('keypress', ['$event'])
  validateInput(event: KeyboardEvent): void {
    // -- CTRL/CMD/SHIFT/ALT
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }

    // -- special keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    let current: string = this.el.nativeElement.value + event.key;

    console.log(current);
    console.log(this.regex.test(current));

    if (!this.regex.test(current)) {
      event.preventDefault()
    }
  }

  @HostListener('paste', ['$event'])
  validatePaste(event: ClipboardEvent): void {
    if (!this.regex.test(event.clipboardData.getData('text'))) {
      event.preventDefault()
    }
  }
}
