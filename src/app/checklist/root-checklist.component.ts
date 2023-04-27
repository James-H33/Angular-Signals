import { CommonModule } from '@angular/common';
import { Component, computed, effect } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChecklistStateService } from './checklist-state.service';
import { ChecklistStateSignalService } from './checklist-state-signals.service';

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
        *ngFor="let checklist of checklists$" class="root-checklist-checklist"
        [routerLink]="[checklist.id]"
      >
        {{ checklist.name }}
      </div>
    </div>
  `
})
export class RootChecklistComponent {
  public checklists$: any[] = [];

  public updated = effect(() => {
    this.checklists$ = this.state.state().checklists as any;
  })
  
  constructor(
    private state: ChecklistStateSignalService
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
