import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
/**
 * Handles the form for adding services to the monitoring system.
 * Form could also be used to edit selections but that feature is not implemented in the current version. 
 */
@Component({
  selector: 'app-edit-selection',
  templateUrl: './edit-selection.component.html',
  styleUrls: ['./edit-selection.component.scss'],
})
export class EditSelectionComponent implements OnInit {
  newSelectionForm;
  submit: any;

  constructor(
    private dialog: MatDialogRef<EditSelectionComponent>,
    private formBuilder: FormBuilder
  ) {}

  /**
   * On init makes a new blank form for monitoring a service
   */
  ngOnInit(): void {
    this.newSelectionForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      serviceUrl: ['', [Validators.required]],
    });
  }
  /**
   * On submitting the form resets the input fields and gives the data to
   * subscribed components
   */
  onSubmit() {
    const { value, valid } = this.newSelectionForm;
    if (valid) {
      this.newSelectionForm.reset();
      this.dialog.close(value);
    }
  }

  /**
   * Closes the dialog window without passing over the content of the input fields
   */
  onCloseButton(): void {
    this.dialog.close();
  }
}
