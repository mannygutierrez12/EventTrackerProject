window.addEventListener("load", function(e){
	init();
});

function init(){
	
	
	
	document.appointmentForm.lookup.addEventListener('click', function(event) {
		event.preventDefault();
		let appointmentId = document.appointmentForm.appointmentId.value;
		if (!isNaN(appointmentId) && appointmentId > 0) {
			getAppointment(appointmentId);
		}
	});
	
	document.newAppointmentForm.addAppointmentButton.addEventListener("click", function(evt){
		evt.preventDefault();
		
		let form = document.newAppointmentForm;
		let theAppointment = {
			name: form.name.value,
		
		};
		
		console.log(theAppointment)
		addNewAppointment(theAppointment);
		
	});
	
	getAllAppointments();
	
	
}


function getAllAppointments(){
	let xhr = new XMLHttpRequest();
	
	xhr.open("GET", "api/appointments");
	
	xhr.onreadystatechange = function(){
		 if (xhr.readyState === 4) {
	      if (xhr.status === 200) {
	        let appointments = JSON.parse(xhr.responseText);
	        displayAllAppointments(appointments);        
	      } else {
	        displayError("No Appointments to show");
	      }
	    }
	};
	
	xhr.send();
}


function getAppointment(appointmentId) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "api/appointments/" + appointmentId, true);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let appointment = JSON.parse(xhr.responseText);
        console.log(appointment);
        displayAppointment(appointment);
      }	 else {
        displayError("No Appointment found");
      }
    }
  };
  xhr.send();
}




function displayError(errorMessage){
	
	let appointmentDiv = document.getElementById("appointmentData");
	
	
	appointmentDiv.textContent = "";

	
	let messageElement = document.createElement('h4');
	messageElement.textContent = errorMessage;
	appointmentDiv.appendChild(messageElement);

}



function displayAppointment(appointment) {
	let dataDiv = document.getElementById('appointmentData');
	dataDiv.textContent = '';

	let h1Title = document.createElement('h1');
	h1Title.textContent = appointment.name;
	dataDiv.appendChild(h1Title);

	
	let delButton = document.createElement("button");
	delButton.textContent = "Delete This Appointment";
	dataDiv.appendChild(delButton);
	delButton.classList.add("btn");
	delButton.classList.add("btn-danger");
	
	delButton.addEventListener("click", function(evt){
		evt.preventDefault();
		let appointmentId = document.getElementsByName("appointmentId")[0].value;
		console.log("Delete Appointment " + appointmentId);
		deleteAppointment(appointmentId);
	});
	
	let updateButton = document.createElement("button");
	updateButton.textContent = "Update";
	dataDiv.appendChild(updateButton);
	delButton.classList.add("btn");
	delButton.classList.add("btn-danger");
	
	updateButton.addEventListener("click", function(evt){
		evt.preventDefault();
		let appointmentId = document.getElementsByName("appointmentId")[0].value;
		console.log("Update Appointment " + appointmentId);
		updateAppointment(appointmentId);
	});
}

function displayAllAppointments(appointments) {
	if (appointments && Array.isArray(appointments)) {
		let dataDiv = document.getElementById("appointmentData");
		dataDiv.textContent = "";
		let h2 = document.createElement("h2");
		h2.textContent = "All appointments";
		dataDiv.appendChild(h2);
		
		let ul = document.createElement('ul');
		dataDiv.appendChild(ul);
		
		for (let appointment of appointments) {
			let li = document.createElement('li');
			li.textContent = appointment.name; 
			ul.appendChild(li);
		}
	}
}

function addNewAppointment(newAppointment){
	let xhr = new XMLHttpRequest();
 	xhr.open("POST", "api/appointments");

  	xhr.onreadystatechange = function() {
	    if (xhr.readyState === 4) {
	      if (xhr.status === 201 || xhr.status === 200) {
	        let createdAppointment = JSON.parse(xhr.responseText);
	        displayAppointment(createdAppointment);        
	      } else {
	        displayError("Appointment was not created. Please try again " + xhr.status);
	      }
	    }
	  };
  xhr.setRequestHeader("Content-type", "application/json");
  let newAppointmentJson = JSON.stringify(newAppointment);
  xhr.send(newAppointmentJson);
}


function deleteAppointment(appointmentId) {
  let xhr = new XMLHttpRequest();
  xhr.open("DELETE", "api/appointments/" + appointmentId);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 204) {
        let appointment = JSON.parse(xhr.responseText);
        console.log("The Appointment was successfully deleted" + appointment);
        window.location.href = window.location.href; // Redirect to the current page
      } else {
        displayError("Appointment not found");
      }
    }
  };

  xhr.send();
}



  xhr.send();
}




function updateAppointment(appointmentId, updatedAppointment) {
  let xhr = new XMLHttpRequest();
  xhr.open("PUT", "api/appointments/" + appointmentId);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let appointment = JSON.parse(xhr.responseText);
        console.log("The Appointment was successfully updated: " + JSON.stringify(appointment));
       
      } else {
        displayError("Failed to update appointment");
      }
    }
  };

  xhr.send(JSON.stringify(updatedAppointment));
}
