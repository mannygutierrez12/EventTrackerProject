import { Pipe, PipeTransform } from '@angular/core';
import { Appointment } from './models/appointment';

@Pipe({
  name: 'incomplete'
})
export class IncompletePipe implements PipeTransform {

  transform(appointments: Appointment[], showComplete: boolean): Appointment[] {
    if (showComplete) {
      return appointments;
    }
    let results: Appointment[] = [];
    for (let appointment of appointments) {
      if (!appointment.completed) {
        results.push(appointment);
      }
    }
    return results;
  }

}
