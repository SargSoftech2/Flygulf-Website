import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseUrl = 'https://test.staybit.online/flygulf/api';

  constructor(private http: HttpClient) {}

  // ✅ Save Contact
  sendMessage(data: ContactMessage): Observable<any> {
    return this.http.post(`${this.baseUrl}/contact/send`, data);
  }

  // ✅ ADD THIS METHOD FOR EMAIL
  sendTestEmail(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/test/send-test-email`, data);
  }

}