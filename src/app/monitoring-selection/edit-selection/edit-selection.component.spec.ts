import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSelectionComponent } from './edit-selection.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormsModule } from '@angular/forms';

describe('EditSelectionComponent', () => {
  let component: EditSelectionComponent;
  let fixture: ComponentFixture<EditSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditSelectionComponent],
      imports: [MatDialogModule],
      providers: [{ provide: MatDialogRef, useValue: {} }, FormBuilder],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
