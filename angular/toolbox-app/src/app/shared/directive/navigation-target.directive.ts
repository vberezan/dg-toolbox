import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[dgtNavigationTarget]'
})
export class NavigationTargetDirective {
  regex: RegExp = /^(?:(?:1\.(?:[1-9]|1\d|2[0-5]))|(?:[2-9]|1[0-3])\.(?:[1-6])|(?:[1-4][0-9]|49)\.(?:[1-2]))\.(?:[1-4](?:\.(?:[1-9]|1[0-2]))?|[1-9])$|^2\.(?:[1-6])\.(?:[1-4](?:\.(?:[1-6]))?|[1-9])$|^(?:([3-9]|1[0-3])\.(?:[1-6])\.(?:[1-4](?:\.(?:[1-9]|1[0-2]))?|[1-9]))$|^([1-4][0-9]|49)\.(?:[1-2])\.(?:[1-4](?:\.(?:[1-9]|1[0-9]))?|[1-9])$/;


  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    console.log(event.key);

    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

}
