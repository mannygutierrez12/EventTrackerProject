import { Appointment } from 'src/app/models/appointment';
import { AppointmentService } from './../../services/appointment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
  appointmentList: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.index().subscribe({
      next: (appointmentList) => {
        this.appointmentList = appointmentList;
      },
      error: (ohpoop) => {
        console.log(ohpoop);
      },
    });
  }
}
