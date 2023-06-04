package com.skilldistillery.appointmenttracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.appointmenttracker.entities.Appointment;
import com.skilldistillery.appointmenttracker.repositories.AppointmentRepository;

@Service
public class AppointmentServiceImpl implements AppointmentService {

	@Autowired
	private AppointmentRepository repo;
	
	@Override
	public List<Appointment> listAllAppointments() {
		return repo.findAll();
	
	}

	@Override
	public Appointment getAppointmentById(int appointmentId) {
		return repo.findById(appointmentId);
	}

	@Override
	public Appointment create(Appointment appointment) {
		return repo.saveAndFlush(appointment);
	}

	@Override
    public Appointment update(int appointmentId, Appointment appointment) {
        Appointment managed = repo.findById(appointmentId);
        
        if (managed != null) {
        	managed.setName(appointment.getName());   	
        	return repo.saveAndFlush(appointment);
        }
        return null;
    }

	@Override
	public boolean delete(int appointmentId) {
		repo.deleteById(appointmentId);
        return !repo.existsById(appointmentId);
	}

}
