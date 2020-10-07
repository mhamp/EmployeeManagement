import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  opened = true;
  @ViewChild('sidenav') sidenav: MatSidenav;

  ngOnInit() {
   
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
   
  }

  isBiggerScreen() {
   
  }
}
