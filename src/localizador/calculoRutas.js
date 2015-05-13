// *******************************************************************************************
// ******************* Funciones para el cálculo de rutas ************************************
// *******************************************************************************************

	// ****************************************************************************************
	// ***************** Función setDirections ************************************************
	// ****************************************************************************************
	// 
	// Descripción: calcula la ruta con el API de Google Maps
	// Llamada por:
	//		función localizaRecursos
	// Invoca a:
	//		nada
	// Recibe:
	//		- latCasa
	//		- lngCasa
	//		- latHacia
	//		- lngHacia
	// Devuelve:
	// 	almacena en gdir la ruta
	// Variables locales:
	//		- desde
	//		- hacia
	//		- i
	// Variables globales:
	//		- gdir

	function setDirections(hacia) {
		infoGlobo.close();
		Globo = false; 
		haciag=hacia;
		var i;
		var modoViaje;
		
		//comprobar tipo trayecto seleccionado
		for (i=0;i<document.form_ruta.tipo.length;i++){ 
  			if (document.form_ruta.tipo[i].checked){
     			break; 
			}
		}
    			
		switch (document.form_ruta.tipo[i].value) {
			case "1"://a pie
  				modoViaje = google.maps.DirectionsTravelMode.WALKING;
  				break;
			case "2"://conduccion
				modoViaje = google.maps.DirectionsTravelMode.DRIVING;
				break;
			}
			
		var request = {
			origin: casa, 
			destination: hacia,
			travelMode: modoViaje
		};
		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
				hay_ruta = true;
			}
		});


	}//*************** Fin Función setDirections **********************************************
			
	function tipoRuta() {
		if (hay_ruta) {
			setDirections(haciag);
		} 
	}
			
	// ****************************************************************************************
	// ***************** Función erroresCalculoRuta *******************************************
	// ****************************************************************************************
	// 
	// Descripción: si se da algún error al calcular la ruta, lanza un mensaje de
	// alerta con una descripción del error
	// Llamada por: 
	// 	función load
	// Invoca a:
	//		nada
	// Recibe: 
	//		nada
	// Devuelve: 
	//		mensaje de alerta si se da un error	
	// Variables locales: 
	//		ninguna
	// Variables globales:
	//		- gdir
	function erroresCalculoRuta(){  
		if (gdir.getStatus().code == G_GEO_UNKNOWN_ADDRESS)  
		  alert("Direccion desconocida");  
		else if (gdir.getStatus().code == G_GEO_SERVER_ERROR)  
		  alert("Error de Servidor");  
		else if (gdir.getStatus().code == G_GEO_MISSING_QUERY)  
		  alert("Falta la direccion inicial");  
		else if (gdir.getStatus().code == G_GEO_BAD_KEY)  
		  alert("Clave de Google Maps incorrecta");  
		else if (gdir.getStatus().code == G_GEO_BAD_REQUEST)  
		  alert("No se ha encontrado la direccion de llegada");  
		else alert("Error desconocido");  
	}// ************** fin función erroresCalculoRuta *****************************************
		
	function onGDirectionsLoad(){   
}  

// ***************** Fin funciones para el cálculo de rutas **********************************
