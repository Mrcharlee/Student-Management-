import { Component, OnInit, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// ========== INTERFACES ==========
export interface StudentRequest {
  Name: string;
  Code: string;
  Email: string;
  Phone: string;
  Addresses: AddressRequest[];
}

export interface AddressRequest {
  Street: string;
  City: string;
  State: string;
  ZipCode: string;
  AddressType: string;
}

export interface StudentResponse {
  id: number;
  name: string;
  code: string;
  email: string;
  phone: string;
  addresses: Address[];
}

export interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  addressType: string;
  studentId: number;
}

interface FrontendAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface FrontendStudent {
  id?: number;
  name: string;
  code: string;
  email: string;
  phone: string;
  addresses: FrontendAddress[];
}

// ========== SERVICE ==========
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  // Change to public so component can access it
  public apiUrl = 'https://localhost:7145/api/StudentAPI';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<StudentResponse[]> {
    return this.http.get<StudentResponse[]>(this.apiUrl);
  }

  addStudent(student: StudentRequest): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, student, { headers });
  }

  updateStudent(id: number, student: StudentRequest): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/${id}`, student, { headers });
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

// ========== COMPONENT ==========
@Component({
  selector: 'app-student',
  templateUrl: './student-add.html',
  styleUrls: ['./student-add.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class StudentComponent implements OnInit {
  studentObjs: FrontendStudent[] = [];
  studentObj: FrontendStudent;
  isEditMode: boolean = false;
  originalStudent: FrontendStudent | null = null;

  constructor(private studentService: StudentService, private http: HttpClient) {
    this.studentObj = this.initializeStudent();
  }

  ngOnInit(): void {
    console.log('=== STUDENT APP STARTED ===');
    this.loadStudents();
  }

  initializeStudent(): FrontendStudent {
    return {
      name: '',
      code: '',
      email: '',
      phone: '',
      addresses: [
        { street: '', city: '', state: '', zipCode: '' }, // Permanent address
        { street: '', city: '', state: '', zipCode: '' }  // Temporary address
      ]
    };
  }

  // Filter out invalid students (with name as 0 or empty)
  getValidStudents(): FrontendStudent[] {
    return this.studentObjs.filter(student => 
      student.name !== '0' && student.name.trim() !== '' && 
      student.code !== '0' && student.code.trim() !== ''
    );
  }

  // Format address for display
  getAddress(addresses: FrontendAddress[] | undefined, index: number): string {
    if (!addresses || !addresses[index]) return '';
    
    const address = addresses[index];
    const parts = [];
    
    if (address.street && address.street.trim() !== '') parts.push(address.street);
    if (address.city && address.city.trim() !== '') parts.push(address.city);
    if (address.state && address.state.trim() !== '') parts.push(address.state);
    if (address.zipCode && address.zipCode.trim() !== '') parts.push(address.zipCode);
    
    return parts.length > 0 ? parts.join(', ') : '';
  }

  // Convert frontend student to backend request format
  private convertToStudentRequest(student: FrontendStudent): StudentRequest {
    console.log('🔧 Converting frontend to backend format...');
    
    const request: StudentRequest = {
      Name: student.name,
      Code: student.code,
      Email: student.email,
      Phone: student.phone,
      Addresses: []
    };

    // Add Permanent address (index 0) if any field has data
    const permAddress = student.addresses[0];
    if (permAddress.street.trim() || permAddress.city.trim() || 
        permAddress.state.trim() || permAddress.zipCode.trim()) {
      request.Addresses.push({
        Street: permAddress.street || "",
        City: permAddress.city || "",
        State: permAddress.state || "",
        ZipCode: permAddress.zipCode || "",
        AddressType: "Permanent"  // Must be exactly "Permanent"
      });
    }

    // Add Temporary address (index 1) if any field has data
    const tempAddress = student.addresses[1];
    if (tempAddress.street.trim() || tempAddress.city.trim() || 
        tempAddress.state.trim() || tempAddress.zipCode.trim()) {
      request.Addresses.push({
        Street: tempAddress.street || "",
        City: tempAddress.city || "",
        State: tempAddress.state || "",
        ZipCode: tempAddress.zipCode || "",
        AddressType: "Temporary"  // Must be exactly "Temporary"
      });
    }

    console.log('✅ Converted request:', JSON.stringify(request, null, 2));
    return request;
  }

  // Convert backend response to frontend format
  private convertToStudent(response: StudentResponse): FrontendStudent {
    // Find addresses by type
    const permanentAddress = response.addresses.find(addr => 
      addr.addressType?.toLowerCase() === "permanent") || 
      { street: '', city: '', state: '', zipCode: '' };
    
    const temporaryAddress = response.addresses.find(addr => 
      addr.addressType?.toLowerCase() === "temporary") || 
      { street: '', city: '', state: '', zipCode: '' };

    return {
      id: response.id,
      name: response.name,
      code: response.code,
      email: response.email || '',
      phone: response.phone || '',
      addresses: [
        { 
          street: permanentAddress.street || '', 
          city: permanentAddress.city || '', 
          state: permanentAddress.state || '', 
          zipCode: permanentAddress.zipCode || '' 
        },
        { 
          street: temporaryAddress.street || '', 
          city: temporaryAddress.city || '', 
          state: temporaryAddress.state || '', 
          zipCode: temporaryAddress.zipCode || '' 
        }
      ]
    };
  }

  loadStudents(): void {
    console.log('📡 Loading students from:', this.studentService.apiUrl);
    
    this.studentService.getStudents().subscribe({
      next: (students: StudentResponse[]) => {
        console.log('✅ Students loaded:', students);
        this.studentObjs = students.map(student => this.convertToStudent(student));
        console.log('📋 Frontend students:', this.studentObjs);
      },
      error: (error) => {
        console.error('❌ Error loading students:', error);
        console.error('Status:', error.status);
        console.error('Message:', error.message);
        alert('Error loading students: ' + error.message);
      }
    });
  }

  submitForm(): void {
    console.log('🚀 Submitting form...');
    
    // Get the raw values BEFORE any processing
    const rawName = this.studentObj.name;
    const rawCode = this.studentObj.code;
    
    console.log('Raw values - Name:', rawName, 'Code:', rawCode);

    // FIRST: Check for "0" values (before trimming)
    if (rawName === '0' || rawCode === '0') {
      alert('Name and Student Code cannot be "0"');
      return;
    }

    // SECOND: Trim the values
    const trimmedName = rawName.trim();
    const trimmedCode = rawCode.trim();
    
    console.log('Trimmed values - Name:', trimmedName, 'Code:', trimmedCode);

    // THIRD: Check for empty values after trimming
    if (!trimmedName) {
      alert('Please enter a valid student name');
      return;
    }

    if (!trimmedCode) {
      alert('Please enter a valid student code');
      return;
    }

    // FOURTH: Apply the trimmed values
    this.studentObj.name = trimmedName;
    this.studentObj.code = trimmedCode;
    this.studentObj.email = this.studentObj.email.trim();
    this.studentObj.phone = this.studentObj.phone.trim();

    // Trim address fields
    this.studentObj.addresses.forEach(address => {
      address.street = address.street.trim();
      address.city = address.city.trim();
      address.state = address.state.trim();
      address.zipCode = address.zipCode.trim();
    });

    // Convert to backend format
    const studentRequest = this.convertToStudentRequest(this.studentObj);
    console.log('📤 Sending to backend:', JSON.stringify(studentRequest, null, 2));

    if (this.isEditMode && this.originalStudent && this.originalStudent.id) {
      // Update existing student
      console.log(`🔄 Updating student ID: ${this.originalStudent.id}`);
      
      this.studentService.updateStudent(this.originalStudent.id, studentRequest).subscribe({
        next: (response) => {
          console.log('✅ Update response:', response);
          alert('Student updated successfully');
          this.loadStudents();
          this.clearForm();
          this.isEditMode = false;
          this.originalStudent = null;
        },
        error: (error) => {
          console.error('❌ Error updating student:', error);
          console.error('Status:', error.status);
          console.error('Status Text:', error.statusText);
          
          if (error.error) {
            console.error('Error body:', error.error);
            if (typeof error.error === 'string') {
              alert('Error: ' + error.error);
            } else if (error.error.message) {
              alert('Error: ' + error.error.message);
            } else {
              alert('Error updating student. Check console for details.');
            }
          } else {
            alert('Unknown error. Check console.');
          }
        }
      });
    } else {
      // Add new student
      console.log('➕ Adding new student...');
      
      this.studentService.addStudent(studentRequest).subscribe({
        next: (response) => {
          console.log('✅ Add response:', response);
          alert('Student added successfully');
          this.loadStudents();
          this.clearForm();
        },
        error: (error) => {
          console.error('❌ Error adding student:', error);
          console.error('Status:', error.status);
          console.error('Status Text:', error.statusText);
          
          if (error.error) {
            console.error('Error body:', error.error);
            if (typeof error.error === 'string') {
              alert('Error: ' + error.error);
            } else if (error.error.message) {
              alert('Error: ' + error.error.message);
            } else {
              alert('Error adding student. Check console for details.');
            }
          } else {
            alert('Unknown error. Check console.');
          }
        }
      });
    }
  }

  editStudent(student: FrontendStudent): void {
    console.log('✏️ Editing student:', student);
    this.studentObj = { ...student };
    this.originalStudent = student;
    this.isEditMode = true;
  }

  deleteStudent(student: FrontendStudent): void {
    if (confirm('Are you sure you want to delete this student?')) {
      if (student.id) {
        console.log(`🗑️ Deleting student ID: ${student.id}`);
        
        this.studentService.deleteStudent(student.id).subscribe({
          next: (response) => {
            console.log('✅ Delete response:', response);
            alert('Student deleted successfully');
            this.loadStudents();
          },
          error: (error) => {
            console.error('❌ Error deleting student:', error);
            alert('Error deleting student: ' + error.message);
          }
        });
      }
    }
  }

  cancelEdit(): void {
    console.log('❌ Cancelling edit');
    this.clearForm();
    this.isEditMode = false;
    this.originalStudent = null;
  }

  clearForm(): void {
    console.log('🧹 Clearing form');
    this.studentObj = this.initializeStudent();
  }

  // Test connection method
  testConnection(): void {
    console.log('🔗 Testing backend connection...');
    
    // Test GET request
    this.http.get(this.studentService.apiUrl).subscribe({
      next: (res) => console.log('✅ GET successful:', res),
      error: (err) => console.error('❌ GET failed:', err)
    });
  }
}