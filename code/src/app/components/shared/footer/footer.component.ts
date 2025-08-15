import { Component } from '@angular/core';
import { APP_TITLE } from 'src/app/core/constants/app-constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  APP_TITLE = APP_TITLE
}
