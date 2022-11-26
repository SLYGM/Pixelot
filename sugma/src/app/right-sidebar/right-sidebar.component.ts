import { Component, Input } from '@angular/core';
import { Entity } from 'types';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent {
  @Input() entity?: Entity;
}
