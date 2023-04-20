import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'checklist',
    loadChildren: () =>
      import('./checklist/checklist.module').then((m) => m.CheckListModule),
  },
  { path: '', redirectTo: 'checklist', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
