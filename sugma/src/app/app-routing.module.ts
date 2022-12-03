import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConstructionComponent } from './construction/construction.component';
import { SceneTabComponent } from './scene-tab/scene-tab.component';

const routes: Routes = [
  {path: 'scene/:sceneName', component: SceneTabComponent},
  {path: 'construction', component: ConstructionComponent},
  { path: '',   redirectTo: '/construction', pathMatch: 'full' },
  // { path: '**', component: SceneTabComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
