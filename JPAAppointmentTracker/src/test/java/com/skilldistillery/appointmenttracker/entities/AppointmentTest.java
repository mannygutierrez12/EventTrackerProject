package com.skilldistillery.appointmenttracker.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class AppointmentTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Appointment Appointment;
	
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPAAppointmentTracker");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		Appointment = em.find(Appointment.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		Appointment = null;
	}

	@Test
	void test_Appointment_entity_mapping() {
		assertNotNull(Appointment);
		assertEquals("chick fil a ", Appointment.getName());
	}
	
//	@Test
//	void test_Appointment_Post_OneToMany_mapping() {
//		assertNotNull(Appointment);
//		assertNotNull(Appointment.getPosts());
//		assertTrue(Appointment.getPosts().size() > 0);
//	}
}
