export class Appointment {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  completeDate: string | null;

  constructor(
    id: number = 0,
    name: string = '',
    description: string = ' ',
    completed: boolean = false,
    completeDate: string | null = null
  ){
    this.id = id;
    this.name = name;
    this.description = description
    this.completed = completed;
    this.completeDate = completeDate;
  }
}


