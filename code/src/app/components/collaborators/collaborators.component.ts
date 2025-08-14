import { Component } from '@angular/core';

interface Collaborator {
  name: string;
  github: string;
}

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css']
})
export class CollaboratorsComponent {
   collaborators: Collaborator[] = [
    { name: 'Ali Qumail', github: 'https://github.com/aliqumail' }
  ];

}
