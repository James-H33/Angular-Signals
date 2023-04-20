import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, distinctUntilChanged, map } from 'rxjs'
import { CreateId } from '../utils/utils'

export interface IChecklistItem {
  id: string
  name: string
  checked: boolean
}

export interface IChecklist {
  id: string
  name: string
  items: IChecklistItem[]
}

export interface IChecklistState {
  checklists: IChecklist[]
}

const initialState = {
  checklists: [
    {
      id: '1',
      name: 'Checklist 1',
      items: [
        {
          id: '1',
          name: 'Item 1',
          checked: false,
        },
        {
          id: '2',
          name: 'Item 2',
          checked: false,
        },
      ],
    },
    {
      id: '2',
      name: 'Checklist 2',
      items: [
        {
          id: '1',
          name: 'Item 1',
          checked: false,
        },
      ],
    },
  ],
}

@Injectable({
  providedIn: 'root',
})
export class ChecklistStateService {
  public state$ = new BehaviorSubject<IChecklistState>(initialState)

  public get state() {
    return this.state$.getValue()
  }

  constructor() {
    const json: any = localStorage.getItem('state')
    const state = JSON.parse(json) ?? initialState
    this.state$.next(state)
  }

  public select<k>(mapFn: (s: IChecklistState) => k): Observable<k> {
    return this.state$.asObservable().pipe(
      map((s) => mapFn(s)),
      distinctUntilChanged()
    )
  }

  public setState(state: Partial<IChecklistState>) {
    const newState = { ...this.state, ...state }

    localStorage.setItem('state', JSON.stringify(newState))

    this.state$.next(newState)
  }

  public addChecklist(title: string) {
    const newList = {
      id: CreateId(),
      name: title,
      items: []
    }

    const checklists = [...this.state.checklists, newList];

    this.setState({ checklists });
  }

  public updateList(list: IChecklist) {
    const checklists = this.state.checklists.map((l) => {
      if (l.id === list.id) {
        return list
      }

      return l
    })

    this.setState({ checklists })
  }

  public addChecklistItem(title: string, checklist: IChecklist) {
    const newListItem = {
      id: CreateId(),
      name: title,
      checked: false,
    }

    const list = checklist

    const newList = {
      ...list,
      items: [...list.items, newListItem],
    }

    this.updateList(newList)
  }

  public deleteChecklistItem(id: string, list: IChecklist) {
    const newItems = list.items.filter((z) => z.id !== id)

    const newList: any = {
      ...list,
      items: newItems,
    }

    this.updateList(newList)
  }

  public toggleChecklistItem(item: IChecklistItem, list: IChecklist) {
    const newListItem = {
      ...item,
      checked: !item.checked,
    }

    const newList = {
      ...list,
      items: list.items.map((z) => (z.id === newListItem.id ? newListItem : z)),
    }

    this.updateList(newList)
  }
}
