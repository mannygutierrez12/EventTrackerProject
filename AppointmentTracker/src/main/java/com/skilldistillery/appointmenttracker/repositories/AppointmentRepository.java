package com.skilldistillery.appointmenttracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.appointmenttracker.entities.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
  
	Appointment findById(int id);
}
