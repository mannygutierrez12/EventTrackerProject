import { AppointmentService } from './../../services/appointment.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  title: string = 'ngAppointment';
  appointments: Appointment[] = [];
  selected: Appointment | null = null;
  newAppointment: Appointment = new Appointment();
  editAppointment: Appointment | null = null;
  showComplete: boolean = false;

  constructor(
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    let idString = this.route.snapshot.paramMap.get('id');

    if (idString) {
      let appointmentId: number = Number.parseInt(idString);

      if (isNaN(appointmentId)) {
        this.router.navigateByUrl('invalid Url');
      } else {
        this.appointmentService.show(appointmentId).subscribe({
          next: (appointment) => {
            this.displayAppointment(appointment);
          },
          error: (oops) => {
            console.error('error getting appointment');
            console.error(oops);
            this.router.navigateByUrl('appointmentNotFound');
          },
        });
      }
    }

    this.reload();
  }

  reload() {
    this.appointmentService.index().subscribe({
      next: (appointmentList) => {
        this.appointments = appointmentList;
      },
      error: (someError) => {
        console.error(
          'AppointmentListComponent.reload(): error getting appointment list'
        );
        console.error(someError);
      },
    });
  }

  getIncompleteAnxietyLevel() {
    let numIncompleteAppointments = this.getAppointmentCount();
    if (numIncompleteAppointments >= 10) {
      return 'danger';
    } else if (numIncompleteAppointments >= 5) {
      return 'warning';
    } else {
      return 'good';
    }
  }

  getAppointmentCount(): number {
    return this.appointments.filter((appointment) => !appointment.completed)
      .length;
  }

  displayAppointment(appointment: Appointment): void {
    this.selected = appointment;
  }

  displayTable(): void {
    this.selected = null;
  }

  setEditAppointment(): void {
    this.editAppointment = Object.assign({}, this.selected);
  }

  addAppointment(appointment: Appointment) {
    this.appointmentService.create(appointment).subscribe({
      next: (createdAppointment) => {
        this.newAppointment = new Appointment();
        this.reload();
      },
      error: (badNews) => {
        console.error(
          'AppointmentComponent.addAppointment(): error creating appointment'
        );
        console.error(badNews);
      },
    });
  }

  updateAppointment(
    appointment: Appointment,
    goToDetails: boolean = true
  ): void {
    this.appointmentService.update(appointment).subscribe({
      next: (updatedAppointment) => {
        if (goToDetails) {
          this.selected = updatedAppointment;
        }
        this.editAppointment = null;
        this.reload();
      },
      error: (noJoy) => {
        console.error(
          'AppointmentListComponent.updateAppointment(): error on update'
        );
        console.error(noJoy);
      },
    });
  }

  deleteAppointment(appointmentId: number) {
    this.appointmentService.destroy(appointmentId).subscribe({
      next: () => {
        this.reload();
      },
      error: (fail) => {
        console.error(
          'AppointmentListComponent.deleteAppointment(): error deleting'
        );
        console.error(fail);
      },
    });
  }
}
