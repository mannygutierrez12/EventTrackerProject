package com.skilldistillery.appointmenttracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.appointmenttracker.entities.Appointment;
import com.skilldistillery.appointmenttracker.services.AppointmentService;

@CrossOrigin({"*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class AppointmentController {

	@Autowired
	private AppointmentService appointmentService;

	@GetMapping("appointments")
	public List<Appointment> listAllAppointments() {
		return appointmentService.listAllAppointments();
		

	}

	@GetMapping("appointments/{id}")
	public Appointment show(HttpServletResponse resp, @PathVariable int id) {
		Appointment appointment = appointmentService.getAppointmentById(id);

		if (appointment == null) {
			resp.setStatus(404);
		}
		return appointment;
	}

	
	
	@PostMapping("appointments")
	public Appointment create(HttpServletResponse resp, @RequestBody Appointment appointment) {
		Appointment created = appointmentService.create(appointment);
		if (created != null) {
		resp.setStatus(201);
	}
		return created;
	}
	
	@PutMapping("appointments/{id}")
	public Appointment update(HttpServletResponse resp, @PathVariable int id, @RequestBody Appointment appointment) {

		Appointment updated = appointmentService.update(id, appointment);
		return updated;
	}
	
	@DeleteMapping("appointments/{id}")
	public void delete(HttpServletResponse resp, @PathVariable int id) {
		boolean deleted = appointmentService.delete(id);

		if (deleted) {
			resp.setStatus(204);
		}

	}

}
