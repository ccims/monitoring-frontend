import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CpuObservationEndpoint } from 'cpu-monitoring-models';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-observation-endpoint',
  templateUrl: './edit-observation-endpoint.component.html',
  styleUrls: ['./edit-observation-endpoint.component.scss']
})
/**
 * component for editing and updating the observation endpoints
 */
export class EditObservationEndpointComponent implements OnInit {

  newEndpointForm;
  submit: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private endpoint: CpuObservationEndpoint,
    private dialog: MatDialogRef<EditObservationEndpointComponent>,
    private formBuilder: FormBuilder
  ) {}
  
  /**
   * Creates forms for the new endpoint with the received endpoint data.
   * Creates form without values if no data is given (e.g. when adding a new endpoint)
   */
  ngOnInit(): void {
    if (!this.endpoint) {
      this.newEndpointForm = this.formBuilder.group({
        name: '',
        endpoint: '',
        threshold: '',
        frequency: '',
        minimal: 0,
      })
    } else {
      this.newEndpointForm = this.formBuilder.group({
        name: this.endpoint.name,
        endpoint: this.endpoint.cpuUtilQueryEndpoint,
        threshold: this.endpoint.criticalCpuUtilThreshold,
        frequency: this.endpoint.cpuObservationFrequencyMilis,
        minimal: this.endpoint.minimalCpuUtilThreshold
      })
    }
  }

  /**
   * after the data was submitted the dialog closes and the form resets
   * 
   * @param endpointData the given endpoint
   */
  onSubmit(endpointData) {
    this.newEndpointForm.reset();
    this.dialog.close(endpointData);
  }
  /**
   * When the close button is pressed on the dialog
   * the dialog is closed without submitting data
   */
  onClose() {
    this.dialog.close();
  }
}
