import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { RootChecklistComponent } from './root-checklist.component'
import { EditChecklistComponent } from './edit-checklist/edit-checklist.component'

const routes = [
  {
    path: '',
    component: RootChecklistComponent
  },
  {
    path: ':id',
    component: EditChecklistComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckListRouterModule {}
