import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabuleiroRoutingModule } from './tabuleiro-routing.module';
import { TabuleiroComponent } from './tabuleiro.component';


@NgModule({
  declarations: [TabuleiroComponent],
  imports: [CommonModule,TabuleiroRoutingModule],
  exports: [TabuleiroComponent],
})
export class TabuleiroModule { }
