import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'dgt-alliance-orders-manager-panel',
  templateUrl: './orders-panel.component.html',
  styleUrls: ['./orders-panel.component.css']
})
export class OrdersPanelComponent {

  onSubmit(form: NgForm): void {
    console.log(form.value.galaxy);
  }
}
