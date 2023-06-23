import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TabuleiroModule } from '../tabuleiro/tabuleiro.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule,HomeRoutingModule, TabuleiroModule],
  exports: [HomeComponent],
})
export class HomeModule { }
