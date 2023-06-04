package com.skilldistillery.appointmenttracker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.appointmenttracker.entities.Appointment;
import com.skilldistillery.appointmenttracker.services.AppointmentService;

@RestController
@RequestMapping("api")
public class AppointmentController {
	
	@Autowired
	private AppointmentService appointment;
	
	
	@GetMapping("appointments")
	public List<Appointment> listAllAppointments(){
		return appointment.listAllAppointments();
	}

}
