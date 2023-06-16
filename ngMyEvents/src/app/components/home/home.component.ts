import { AppointmentService } from './../../services/appointment.service';
import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {

  appointmentList: Appointment[] = [];

  constructor(
    private appointmentService: AppointmentService
  ){

  }

ngOnInit(): void{
  this.loadAppointments();
}


loadAppointments(){
  this.appointmentService.index().subscribe({
    next: (appointmentList) => {
      this.appointmentList = appointmentList;
    },
    error: (ohpoop) => {
      console.log(ohpoop);

    }
  })
}




}
