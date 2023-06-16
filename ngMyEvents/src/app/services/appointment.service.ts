import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Appointment } from '../models/appointment';


@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  url: string = environment.baseUrl + 'api/appointments';

  constructor(private http: HttpClient) {}

  index(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.url).pipe(
      catchError((err: any) => {
        console.error('Error fetching todo list', err);
        return throwError(
          'AppointmentService.index(): error retrieving todos ' + err.message
        );
      })
    );
  }
}
