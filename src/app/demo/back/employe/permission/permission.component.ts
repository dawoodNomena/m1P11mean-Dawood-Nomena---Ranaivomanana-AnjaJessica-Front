import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule,RouterModule, SharedModule],
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
})
export default class PermissionComponent implements OnInit {
    date = new Date();
    currentMonth: string;
    

  async ngOnInit() {
        const year = this.date.getFullYear();
        const mm = this.date.getMonth();
        const month = ('0' + (this.date.getMonth() + 1)).slice(-2);
        this.currentMonth = `${year}-${month}`;
       
    }
  
}
