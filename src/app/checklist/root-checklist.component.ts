import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChecklistStateService } from './checklist-state.service';

@Component({
  standalone: true,
  selector: 'RootChecklist',
  styleUrls: ['./root-checklist.component.scss'],
  imports: [
    RouterModule,
    CommonModule
  ],
  template: `
    <h2>Root Checklist</h2>

    <div class="root-checklist-wrapper">

      <div class="root-checklist-add">
        <input 
          #AddInputRef
          type="text"  
        />

        <button (click)="add(AddInputRef)">Add</button>
      </div>


      <div 
        *ngFor="let checklist of checklists$ | async" class="root-checklist-checklist"
        [routerLink]="[checklist.id]"
      >
        {{ checklist.name }}
      </div>
    </div>
  `
})
export class RootChecklistComponent {
  public checklists$ = this.state.select((s) => s.checklists); 
  
  constructor(
    private state: ChecklistStateService
  ) { }

  public add(inputRef: HTMLInputElement) {
    const value = inputRef.value;

    if (!value) {
      return;
    }

    inputRef.value = '';

    this.state.addChecklist(value);
  }
}
