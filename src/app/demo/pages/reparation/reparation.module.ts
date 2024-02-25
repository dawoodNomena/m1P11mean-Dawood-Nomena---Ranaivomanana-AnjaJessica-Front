import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReparationRoutingModule } from './liste/liste-reparation-routing.module';
import { RecuRoutingModule } from './recu/recu-routing.module';
import { EncoursRoutingModule } from './encours/encours-routing.module';
import { TermineRoutingModule } from './termine/termine-routing.module';


@NgModule({
  declarations: [],
  imports: [CommonModule, ReparationRoutingModule,RecuRoutingModule,EncoursRoutingModule,TermineRoutingModule], 
})
export class ReparationModule {}
