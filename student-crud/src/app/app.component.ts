import { Component } from '@angular/core';
import { StudentCrudComponent } from './components/student-crud/student-crud.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentCrudComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'student-crud';
}
