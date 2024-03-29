import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AddEntityDialog, AddLayerDialog, LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { AddComponentDialog, RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SceneTabComponent } from './scene-tab/scene-tab.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { NewSceneDialogComponent } from './new-scene-dialog/new-scene-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConstructionComponent } from './construction/construction.component';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { NewFolderDialogComponent } from './file-explorer/modals/new-folder-dialog/new-folder-dialog.component';
import { RenameDialogComponent } from './file-explorer/modals/rename-dialog/rename-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NewFileDialogComponent } from './file-explorer/modals/new-file-dialog/new-file-dialog.component';
import { LandingComponent } from './landing/landing.component';
import { OpenProjectDialogComponent } from './open-project-dialog/open-project-dialog.component';
import { NewProjectDialogComponent } from './new-project-dialog/new-project-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BuildDialogueComponent } from './build-dialogue/build-dialogue.component';
import { MatSelectModule } from '@angular/material/select';
import { SystemsEditorComponent } from './systems-editor/systems-editor.component';
import { AddShaderDialog, ShaderEditorComponent } from './shader-editor/shader-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    AddComponentDialog,
    AddEntityDialog,
    AddShaderDialog,
    AddLayerDialog,
    NavbarComponent,
    SceneTabComponent,
    NewSceneDialogComponent,
    ConstructionComponent,
    FileExplorerComponent,
    NewFolderDialogComponent,
    RenameDialogComponent,
    FileManagerComponent,
    FileExplorerComponent,
    NewFileDialogComponent,
    LandingComponent,
    OpenProjectDialogComponent,
    NewProjectDialogComponent,
    BuildDialogueComponent,
    SystemsEditorComponent,
    ShaderEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatGridListModule,
    MatMenuModule,
    MatCardModule,
    MatSlideToggleModule,
    DragDropModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
