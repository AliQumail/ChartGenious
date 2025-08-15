import { Component } from '@angular/core';
import { APP_TITLE  } from 'src/app/core/constants/app-constants';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  APP_TITLE = APP_TITLE
}
