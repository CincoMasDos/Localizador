function descarga_arropa() {

	descargaUrl("php/phpsqlgenxml_localizador.php?tipo=arropa&iddiocesana=" + iddiocesana, function(data) {
		var xml = data.responseXML;

		// Lee las polilíneas "arropa"
		var arropa = xml.documentElement.getElementsByTagName("tiendaArropa");

		// Lee cada línea "tiendaArropa" en "arropa"
		for (var a = 0; a < arropa.length; a++) {
		
			// Guarda los atributos de cada "tiendaArropa"
			var nombre = arropa[a].getAttribute("nombre");
			var direccion = arropa[a].getAttribute("direccion");
			var localidad = arropa[a].getAttribute("localidad");
			var telefono = arropa[a].getAttribute("telefono");
			var e_mail = arropa[a].getAttribute("e-mail");
			var horario = arropa[a].getAttribute("horario");
			var observaciones = arropa[a].getAttribute("observaciones");
			var lat = arropa[a].getAttribute("lat");
			var lng = arropa[a].getAttribute("lng");
			var loc = new google.maps.LatLng(parseFloat(lat),parseFloat(lng));

				// Determinamos la imagen del logo de la tienda en el globo, en función de la diocesana (por defecto, la de Valencia)
				var logoGloboTien;
				switch(iddiocesana) {
					case 146: logoGloboTien = "<img src='estilos/img/146-logoglobotien.png' width='58' height='35'>"; break;
					case 219: logoGloboTien = "<img src='estilos/img/globos-arropa.png' width='60' height='20'>"; break;
					default: logoGloboTien = "<img src='estilos/img/globos-arropa.png' width='60' height='20'>";
				} 

			var mensaGlobo = logoGloboTien+"<strong> Tienda "+nombre+"</strong><hr>"+
				""+direccion+" ("+localidad+")<br>"+
				""+telefono+" "+e_mail+"<br>"+
				"<strong>Horario: </strong>"+horario+"<br>"+
				"<strong>Observaciones: </strong>"+observaciones+"<br><br>";
			
			// Añade a las listas globales las variables a almacenar de cada tiendaArropa
			arropa_nombre.push(nombre);
			arropa_punto.push(loc);
			arropa_mensaGlobo.push(mensaGlobo);	
	
		}//for

	});

}
