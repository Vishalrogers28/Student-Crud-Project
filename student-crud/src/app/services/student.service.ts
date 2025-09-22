import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private apiUrl = 'http://127.0.0.1:8000/api/students/'; // your Django endpoint

  constructor(private http: HttpClient) {}

  // GET all students or single
  getStudents(id?: number): Observable<any> {
    let params = new HttpParams();
    if (id) params = params.set('id', id);
    return this.http.get(this.apiUrl, { params });
  }

  // POST create
  addStudent(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // PUT update
  updateStudent(data: any): Observable<any> {
    return this.http.put(this.apiUrl, data);
  }

  // DELETE
  deleteStudent(id: number): Observable<any> {
    let params = new HttpParams().set('id', id);
    return this.http.delete(this.apiUrl, { params });
  }
}
