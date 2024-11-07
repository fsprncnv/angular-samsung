import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SamsungPayComponent } from './samsung-pay/samsung-pay.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SamsungPayComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-samsung';
}
