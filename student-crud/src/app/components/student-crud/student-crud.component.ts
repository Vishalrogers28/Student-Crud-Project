import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-crud',
  standalone: true,  // ⬅️ mark as standalone
  imports: [CommonModule, ReactiveFormsModule], // ⬅️ import directives & forms
  templateUrl: './student-crud.component.html',
  styleUrls: ['./student-crud.component.css']
})
export class StudentCrudComponent implements OnInit {
  students: any[] = [];
  studentForm!: FormGroup;
  editMode = false;
  selectedId: number | null = null;

  constructor(private fb: FormBuilder, private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      address: [''],
      birth_date: ['', Validators.required],
      is_active: [true]
    });
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe(res => this.students = res);
  }

  submit() {
    const formData = this.studentForm.value;
    if (this.editMode && this.selectedId) {
      formData.id = this.selectedId;
      this.studentService.updateStudent(formData).subscribe(() => {
        this.resetForm();
        this.loadStudents();
      });
    } else {
      this.studentService.addStudent(formData).subscribe(() => {
        this.resetForm();
        this.loadStudents();
      });
    }
  }

  edit(student: any) {
    this.editMode = true;
    this.selectedId = student.id;
    // this.studentForm.patchValue(student);
    this.studentForm.patchValue({
    name: student.name,
    city: student.city || '',  // <--- important
    address: student.address,
    birth_date: student.birth_date,
    is_active: student.is_active
  });
  }

  delete(id: number) {
    this.studentService.deleteStudent(id).subscribe(() => this.loadStudents());
  }

  resetForm() {
    this.studentForm.reset({
    name: '',
    city: '',             // also here
    address: '',
    birth_date: '',
    is_active: true
  });
    this.editMode = false;
    this.selectedId = null;
  }
}
