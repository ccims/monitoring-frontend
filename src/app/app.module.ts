import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { ErrorResponseMonitorModule } from './error-response-monitor/error-response-monitor.module';
import { FormsModule } from '@angular/forms';
import { MonitoringSelectionModule} from './monitoring-selection/monitoring-selection.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ErrorResponseMonitorModule,
    MonitoringSelectionModule,
    FormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
