import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './projects/projects.component';
import { StatsComponent } from './stats/stats.component';
import { HighlightDirective } from './logo/logo.directive';
import { CurrencyService } from './shared/service';
import { ChartModule } from 'angular2-highcharts';
import { AppRoutingModule } from './app-routing.module';

import { ModalModule  } from 'ng2-modal';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ChartModule,
    AppRoutingModule,
    ModalModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    ProjectComponent,
    StatsComponent,
    HighlightDirective
  ],
  providers: [CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
