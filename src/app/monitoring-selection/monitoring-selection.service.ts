import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * Provides the methods for sending requests to the backend regarding
 * monitored services
 */
export class MonitoringSelectionService {
  backendUrl = 'http://localhost:3400/monitoring-selection';

  // array of monitored services objects, is used to display monitored services
  selectedServices = [];
  constructor(private httpClient: HttpClient) {}

  /**
   * Sends a request to the backend to add a service to the database
   *
   * @param selection Service added to be monitored
   */
  addSelection(selection: any): Promise<any> {
    try {
      return this.httpClient.post(this.backendUrl, selection).toPromise();
    } catch (err) {
      console.log('Backend not available');
    }
  }
  /**
   * Sends a request to the backend to delete the selected service in the database
   *
   * @param selectionId Id of monitored Service
   */
  deleteSelection(selectionId: string): Promise<any> {
    try {
      return this.httpClient
        .delete(this.backendUrl + '/' + selectionId)
        .toPromise();
    } catch (err) {
      console.log('Backend not available');
    }
  }

  /**
   * Sends a request to the backend to get all services currently monitored
   */
  getAllSelectedServices(): Observable<any> {
    try {
      return this.httpClient.get(this.backendUrl);
    } catch (err) {
      console.log('Backend not available');
    }
  }
}
