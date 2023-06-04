package com.skilldistillery.appointmenttracker.services;

import java.util.List;

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
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Appointment create(Appointment appointment) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Appointment update(int appointmentId, Appointment appointment) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(int appointmentId) {
		// TODO Auto-generated method stub
		return false;
	}

}
