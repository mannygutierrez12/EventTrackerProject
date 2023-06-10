window.addEventListener('load', function(e) {
	console.log('document loaded');
	init();
});

function init() {
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
			title: form.title.value,
			description: form.description.value,
			releaseYear: form.releaseYear.value,
			rating: form.rating.value,
			length: form.length.value
		};
		
		console.log(theAppointment)
		addNewAppointment(theAppointment);
		
	});
}

	// TODO:
	// * Use XMLHttpRequest to perform a GET request to "api/appointments/"
	//   with the appointmentId appended.



  // * On success, if a response was received parse the appointment data
  //   and pass the appointment object to displayAppointment().
  // * On failure, or if no response text was received, put "Appointment not found" 
  //   in the appointmentData div.
  
  function getAppointment(appointmentId) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "api/appointments/" + appointmentId);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let appointment = JSON.parse(xhr.responseText);
        displayAppointment(appointment);
        getActors(appointmentId);
        
      } else {
        displayError("Appointment not found");
      }
    }
  };

  xhr.send();
}


function displayError(errorMessage){
	
	let appointmentDiv = document.getElementById("appointmentData");
	let actorDiv = document.getElementById("actorData");
	
	appointmentDiv.textContent = "";
	actorDiv.textContent = "";
	
	let messageElement = document.createElement('h4');
	messageElement.textContent = errorMessage;
	appointmentDiv.appendChild(messageElement);

}


function displayAppointment(appointment) {
	let dataDiv = document.getElementById('appointmentData');
	dataDiv.textContent = '';

	let h1Title = document.createElement('h1');
	h1Title.textContent = appointment.title;
	dataDiv.appendChild(h1Title);

	let description = document.createElement('p');
	description.textContent = appointment.description;
	dataDiv.appendChild(description);

	let ulAppointmentInfo = document.createElement('ul');
	let liRating = document.createElement('li');
	liRating.textContent = 'Rating: ' + appointment.rating;
	ulAppointmentInfo.appendChild(liRating);

	let liReleaseYear = document.createElement('li');
	liReleaseYear.textContent = 'Release Year: ' + appointment.releaseYear;
	ulAppointmentInfo.appendChild(liReleaseYear);

	let liLength = document.createElement('li');
	liLength.textContent = 'Length: ' + appointment.length + ' minutes';
	ulAppointmentInfo.appendChild(liLength);

	dataDiv.appendChild(ulAppointmentInfo);
	
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
}

function deleteAppointment(appointmentId) {
  let xhr = new XMLHttpRequest();
  xhr.open("DELETE", "api/appointments/" + appointmentId);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 204) {
        let appointment = JSON.parse(xhr.responseText);
        console.log("The Appointment was successfully deleted")
      
      } else {
        displayError("Appointment not found");
      }
    }
  };

  xhr.send();
}



function getActors(appointmentId) {
	
	let xhr = new XMLHttpRequest();
	xhr.open('GET', "api/appointments/" + appointmentId + "/actors");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let actors = JSON.parse(xhr.responseText);
				console.log(actors);
				displayActors(actors);
			} else {
				console.error("Not found")
			}
		}
	};

	xhr.send();
}


function displayActors(actors) {
	if (actors && Array.isArray(actors)) {
		let dataDiv = document.getElementById("actorData");
		dataDiv.textContent = "";
		let h2 = document.createElement("h2");
		h2.textContent = "Cast";
		dataDiv.appendChild(h2);
		
		let ul = document.createElement('ul');
		dataDiv.appendChild(ul);
		
		for (let actor of actors) {
			let li = document.createElement('li');
			li.textContent = actor.firstName; 
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



