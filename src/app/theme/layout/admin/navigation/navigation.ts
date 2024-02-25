import { FinanceMenu } from './listeMenu/financeMenu';
import { AtelierMenu } from './listeMenu/atelierMenu';
import { Injectable, OnInit } from '@angular/core';
import { ClientMenu } from './listeMenu/clientMenu';


export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

@Injectable()
export class NavigationItem implements OnInit {
  menu : any;
  public role: string;

  constructor(){
    if(localStorage.getItem('user')!=null){
        if(JSON.parse(localStorage.getItem('user')).role){
            this.role = JSON.parse(localStorage.getItem('user')).role;
        }
    }
    if(this.role === 'client') this.menu = ClientMenu;
    if(this.role === 'atelier') this.menu = AtelierMenu;
    if(this.role === 'finance') this.menu = FinanceMenu;
  }

  ngOnInit(): void {
    
}
  get() {
    return ClientMenu;
  }
}
