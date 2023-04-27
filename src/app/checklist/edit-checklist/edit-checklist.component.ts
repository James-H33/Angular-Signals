import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ChecklistStateSignalService } from '../checklist-state-signals.service';
import { IChecklist, IChecklistItem } from '../checklist-state.service';

@Component({
  standalone: true,                           
  imports: [
    CommonModule,
    RouterModule
  ],
  selector: 'EditChecklist',
  styleUrls: ['./edit-checklist.component.scss'],
  template: `
    <div class="edit-checklist-back">
      <span [routerLink]="['']">&#8617; Back</span>
    </div>

    <div *ngIf="checklist" class="edit-checklist">
      <h2>{{checklist.name}}</h2>

      <div class="checklist-add">
        <input 
          #AddInputRef
          type="text"  
        />

        <button (click)="addChecklistItem(AddInputRef)">Add</button>
      </div>

      <div 
        *ngFor="let item of checklist.items; trackBy: itemTrackBy" class="edit-checklist-item" 
        [ngClass]="item.checked ? 'completed' : ''"
      >
        <label [for]="item.id" (click)="toggleChecked(item)">
          <input [id]="item.id" type="checkbox" [checked]="item.checked" />
          {{item.name}}
        </label>

        <div class="edit-checklist-item-actions">
          <div class="action-slider" [ngClass]="item.checked ? 'my-active' : ''">
            <span 
              (click)="deleteItem(item)" 
              class="delete">
              &#x2715;
            </span>
  
            <span 
              (click)="toggleChecked(item)" 
              class="undo">
              &#8617;
            </span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class EditChecklistComponent { 
  public checklist?: IChecklist;

  public itemTrackBy = (i: number, item: IChecklistItem) =>  {
    return item.id;
  }

  public updated = effect(() => {
    this.checklist = this.state.state().checklists.find((c: any) => c.id === this.router.snapshot.params['id']);
  })

  constructor(
    private state: ChecklistStateSignalService,
    private router: ActivatedRoute
  ) { }

  public addChecklistItem(inputEl: HTMLInputElement) {
    const value = inputEl.value;
    
    if (!value) {
      return;
    }

    inputEl.value = '';

    const list = this.checklist as IChecklist;
    this.state.addChecklistItem(value, list);
  }

  public deleteItem(item: IChecklistItem) {
    const list = this.checklist as IChecklist;
    this.state.deleteChecklistItem(item.id, list);
  }

  public toggleChecked(item: IChecklistItem) {
    const list = this.checklist as IChecklist;
    this.state.toggleChecklistItem(item, list);
  }
}
