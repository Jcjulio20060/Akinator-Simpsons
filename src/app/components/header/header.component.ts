import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { YellowTextDirective } from '../../directives/yellow-text.directive';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, RouterLink, YellowTextDirective]
})
export class HeaderComponent {
  constructor() {}
}