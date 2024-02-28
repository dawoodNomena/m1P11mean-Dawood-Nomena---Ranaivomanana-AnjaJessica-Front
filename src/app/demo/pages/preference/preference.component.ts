import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-preference',
  standalone: true,
  imports: [CommonModule,RouterModule, SharedModule,CdkDropList, CdkDrag],
  templateUrl: './preference.component.html', 
  styleUrls: ['./preference.component.scss','./style.css','./style2.css'],
})
export default class PreferenceComponent implements OnInit {
    date = new Date();
    currentMonth: string;

    list_employe = ['Employe 1', 'Employe 2'];
    list_service = ['Service 1', 'Service 2'];

    employe_pref = ['Employe 3'];
    service_pref = ['Service 3'];

    drop(event: CdkDragDrop<string[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    }


  async ngOnInit() {
        const year = this.date.getFullYear();
        const mm = this.date.getMonth();
        const month = ('0' + (this.date.getMonth() + 1)).slice(-2);
        this.currentMonth = `${year}-${month}`;
       
    }
  
}
