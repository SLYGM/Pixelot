import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { AddComponentDialog, RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
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

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    AddComponentDialog,
    FileManagerComponent,
    NavbarComponent,
    SceneTabComponent,
    NewSceneDialogComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
