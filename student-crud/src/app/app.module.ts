import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';   // <-- needed for *ngIf, *ngFor
import { provideHttpClient} from '@angular/common/http';   // <--- this

import { AppComponent } from './app.component';
import { StudentCrudComponent } from './components/student-crud/student-crud.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentCrudComponent,
    // etc.
  ],
  providers: [
    provideHttpClient(),  // put this here
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    // remove HttpClientModule or may leave temporarily during migration
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
