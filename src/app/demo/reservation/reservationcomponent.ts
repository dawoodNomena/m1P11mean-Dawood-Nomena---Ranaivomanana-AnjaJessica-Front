import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule,RouterModule,CdkDropList, CdkDrag],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss','./style.css','./style2.css'],
})
export default class ReservationComponent implements OnInit {
    lineSmoothMorrisOption: any;
    lineSmoothMorrisData: any;
    date = new Date();
    currentMonth: string;
    startDate: Date;
    endDate: Date;
    token : string ;
    ben : any = 0;
    chiffre : any = 0;
    moyenne : any;
    stat : any ;
    benload : boolean = false;
    caload : boolean = false;
    repload : boolean = false;
    statload : boolean = false;
    todo = ['Service 1', 'Service 2', 'Service 3'];

    done = [];
  
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
