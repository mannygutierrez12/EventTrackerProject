import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Appointment } from '../models/appointment';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  url: string = environment.baseUrl + 'api/appointments';

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe) {}

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

  create(appointment: Appointment): Observable<Appointment> {
    appointment.completed = false;
    appointment.description = '';
    return this.http.post<Appointment>(this.url, appointment).pipe(
      catchError((err: any) => {
        console.error('Error fetching appointment list');
        return throwError(
          () =>
            new Error(
              'AppointmentService.create(): error retrieving appointments ' +
                err
            )
        );
      })
    );
  }

  update(appointment: Appointment): Observable<Appointment> {
    const updateUrl = `${this.url}/${appointment.id}`;

    if (appointment.completed) {
      appointment.completeDate = this.datePipe.transform(
        Date.now(),
        'shortDate'
      );
    } else {
      appointment.completeDate = '';
    }

    return this.http.put<Appointment>(updateUrl, appointment);
  }

  destroy(id: number): Observable<void> {
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete<void>(deleteUrl);
  }

  show(appointmentId: number): Observable<Appointment> {
    return this.http.get<Appointment>(this.url + '/' + appointmentId).pipe(
      catchError((err: any) => {
        console.error('Error fetching appointment list');
        return throwError(
          new Error(
            'AppointmentService.index(): error retrieving appointments ' + err
          )
        );
      })
    );
  }
}
