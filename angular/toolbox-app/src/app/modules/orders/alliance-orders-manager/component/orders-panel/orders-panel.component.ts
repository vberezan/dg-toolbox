import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'dgt-alliance-orders-manager-panel',
  templateUrl: './orders-panel.component.html',
  styleUrls: ['./orders-panel.component.css']
})
export class OrdersPanelComponent {
  @ViewChild('dgtOrdersForm') ordersForm: NgForm;

  onSubmit(): void {
    console.log(this.ordersForm.value);
  }
}
