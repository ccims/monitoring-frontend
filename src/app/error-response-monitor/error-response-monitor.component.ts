import { Component, OnInit } from '@angular/core';
import { LogMessageFormat } from 'logging-format';
import { ErrorResponseMonitorService } from './error-response-monitor.service';

/**
 * This component is responsible for registering the user request properties
 * in the UI and passing the input values down to the request info sender service
 */
@Component({
  selector: 'app-error-response-monitor',
  templateUrl: './error-response-monitor.component.html',
  styleUrls: ['./error-response-monitor.component.scss'],
})
export class ErrorResponseMonitorComponent implements OnInit {
  //url endpoint, adjustable by user
  urlEndpoint: string;
  //http method, get or post
  httpMethod;
  //datatype of user adjusted response type for get/post request
  responseType;
  //body of the post request if it was selected
  postBody: string;
  //received response of the request
  receivedResponse;
  //work check log messages to be displayed in UI
  workLogs: LogMessageFormat[] = [];
  //all log messages
  allLogs: LogMessageFormat[] = [];
  //error message for fetch all logs
  logFetchErrorMsg: string;

  constructor(private errorResponseService: ErrorResponseMonitorService) {
    /*
    setInterval(() => {
      this.getLogMessages();
    }, 1000);*/
  }

  ngOnInit(): void {}

  /**
   * Passes the request info down to the request info sender service and receives
   * the response in form of response message and log if there was a failure
   *  in order to render it in the UI
   */
  requestInfo() {
    this.errorResponseService
      .sendRequestInfoToBackend(
        this.urlEndpoint,
        this.httpMethod,
        this.responseType,
        this.postBody
      )
      .subscribe(
        (res) => {
          this.receivedResponse = res.msg;
          if (res.log) {
            this.workLogs.push(res.log);
          }
        },
        (err) => (this.receivedResponse = err.message)
      );
  }

  /**
   * Gets all the logs with the aid of the error response monitor service
   * from the backend to render them in the UI
   */
  getAllLogs() {
    this.errorResponseService.fetchAllLogs().subscribe(
      (res) => {
        this.allLogs = res;
        console.log(res);
      },
      (err) => {
        this.logFetchErrorMsg = "Couldn't fetch logs";
      }
    );
  }
}