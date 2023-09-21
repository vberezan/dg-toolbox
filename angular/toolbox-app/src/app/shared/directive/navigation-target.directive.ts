import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[dgtNavigationTarget]'
})
export class NavigationTargetDirective {
  private regex: string = '^(?:[1-9]|[1-4]\\d)\\.(?:(?:[1-6]|1\\d|2[0-5])|(?:(?:[1-9])|1[0-2]))\\.(?:[1-4])\\.(?:(?:[1-9])|(?:[1-9]\\d))$';
  private specialKeys: Array<string> = ['Backspace', 'Space', 'Tab', 'End', 'Home'];


  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    console.log(event.key);

    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

}
