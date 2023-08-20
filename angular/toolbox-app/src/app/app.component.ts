import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    console.log('------------------------------------------------')
    console.log('----- DarkGalaxy Toolbox v0.1 Beta enabled -----');
    console.log('------------------------------------------------')
  }

}
