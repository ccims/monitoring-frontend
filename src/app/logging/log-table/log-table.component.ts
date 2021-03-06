import { Component, OnInit, ViewChild } from '@angular/core';
import { LogMessageFormat, LogType } from 'logging-format';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MonitoringSelectionDTO } from 'src/app/monitoring-selection/dto/monitoring-selection.dto';
import { MonitoringSelectionService } from 'src/app/monitoring-selection/monitoring-selection.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-log-table',
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.scss'],
  animations: [
    // Expand Animation
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
/**
 * component for a table containing all Logs
 */
export class LogTableComponent {

  dataSource: MatTableDataSource<LogMessageFormat>;
  tableColumns = ["time", "type", "detector", "source"];
  expandedLog: LogMessageFormat;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  serviceId: string;
  selectedService: MonitoringSelectionDTO;

  constructor(private http: HttpClient, private route: ActivatedRoute, public monitoringService: MonitoringSelectionService) {
    this.serviceId = this.route.snapshot.params["id"];
    this.fetchLogs();
    if (this.serviceId) {
      this.selectedService = monitoringService.getServiceById(this.serviceId);
    }
  }

  /**
   * Fetch Logs from Issue-creator Service, can get all logs or the ones from a specific Service.
   * 
   * If there is no known id in the serviceID - field, then all logs are fetched. If so then only the ones from the server with that given
   * id are fetched. 
   */
  fetchLogs() {
    let url = environment.BACKEND_ISSUE_CREATOR_URL;
    if (this.serviceId) {
      url = url + this.serviceId;
    }
    this.http.get(url).subscribe((logs) => {
      this.dataSource = new MatTableDataSource(logs as LogMessageFormat[]);
      this.dataSource.sort = this.sort;
    })
  }

  /**
   * Assigns a Label that will be displayed in the log table for each LogType
   * 
   * @param logType that should be converted
   * @returns a Label for each LogType
   */
  getLogTypeLabel(logType: LogType) {
    switch (logType) {
      case LogType.CPU:
        return "CPU";
      case LogType.ERROR:
        return "Error";
      case LogType.CB_OPEN:
        return "Circuit Breaker Open";
      case LogType.TIMEOUT:
        return "Timeout Error";
      default:
        break;
    }
  }

  /**
   * Retrieves the name of a registered service by its url
   * 
   * @param url of a service
   * @returns name of service with the given url
   */
  getServiceNameFromUrl(url: string) {
    const service = this.monitoringService.getServiceByUrl(url);
    return service ? service.name : url;
  }
  
}