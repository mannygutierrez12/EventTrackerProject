package com.skilldistillery.appointmenttracker.services;

import java.util.List;

import com.skilldistillery.appointmenttracker.entities.Appointment;



public interface AppointmentService {
	
	List<Appointment> listAllAppointments();
	Appointment getAppointmentById(int appointmentId);
	Appointment create(Appointment appointment);
	Appointment update(int appointmentId, Appointment appointment);
	boolean delete(int appointmentId);
}
