function descarga_cmssv() {

	descargaUrl("php/phpsqlgenxml_localizador.php?tipo=cmssv&iddiocesana=" + iddiocesana, function(data) {
		var xml = data.responseXML;

		// Lee las polilíneas "cmss"
		var cmssv = xml.documentElement.getElementsByTagName("cmss");

		// Lee cada línea "cmss" en "cmssv"
		for (var a = 0; a < cmssv.length; a++) {
		
			// Guarda los atributos de cada "cmss"
			var nombre = cmssv[a].getAttribute("nombre");
			var direccion = cmssv[a].getAttribute("direccion");
			var CP = cmssv[a].getAttribute("CP");
			var localidad = cmssv[a].getAttribute("localidad");
			var telefono = cmssv[a].getAttribute("telefono");
			var obs_tel = cmssv[a].getAttribute("obs_tel");
			var fax = cmssv[a].getAttribute("fax");
			var e_mail = cmssv[a].getAttribute("e-mail");
			var url = cmssv[a].getAttribute("url");
			var observaciones = cmssv[a].getAttribute("observaciones");
			var lat = cmssv[a].getAttribute("lat");
			var lng = cmssv[a].getAttribute("lng");
			var loc = new google.maps.LatLng(parseFloat(lat),parseFloat(lng));
			var coordenadas = cmssv[a].getAttribute("coordenadas");
			
			if (url != "") {var url2 = "<b>Web</b>: "+url;} //para el informe
			if (url != "") {url = "<a href='"+url+"'>Web</a>";}
			else {var url2 = "";}			
			
			var mensaGlobo = "<img src='estilos/img/globos-ayto_valencia.png' width='20' height='20'>"+
				"<strong>&nbsp;&nbsp;CMSS "+nombre+"</strong>"+
				"<br><hr><strong>Dirección</strong>: "+direccion+"<br>"+
				""+CP+" "+localidad+"<br>"+
				"<strong>Teléfono</strong>: "+telefono+" "+obs_tel+""+
				"<strong>   Fax</strong>: "+fax+"<br>"+
				"<strong>e-mail</strong>: "+e_mail+"  "+url+"<br><br>"+
				"<strong>Observaciones</strong>: "+observaciones+"<br><br>";
			//Igual que el anterior, pero con "url2" (para el informe)
			var mensaGloboInforme = "<img src='estilos/img/globos-ayto_valencia.png' width='20' height='20'>"+
				"<strong>&nbsp;&nbsp;CMSS "+nombre+"</strong>"+
				"<br><hr><strong>Dirección</strong>: "+direccion+"<br>"+
				""+CP+" "+localidad+"<br>"+
				"<strong>Teléfono</strong>: "+telefono+" "+obs_tel+""+
				"<strong>   Fax</strong>: "+fax+"<br>"+
				"<strong>e-mail</strong>: "+e_mail+"  "+url2+"<br><br>"+
				"<strong>Observaciones</strong>: "+observaciones+"<br><br>";			

			
			// Construye la lista de puntos "pts" y determina el punto de mayor latlng y el de menor 
			var resultados = limitesPolyXML(coordenadas);			
			var pts = resultados[0];
			var limiteMax = resultados[1];
			var limiteMin = resultados[2];
			
			// Crea un polígono con la lista de puntos "pts"	
			var poligono = new google.maps.Polygon({
				paths: pts,
				strokeColor: "#33CCFF",
				strokeOpacity: 1,
				strokeWeight: 2,
				fillColor: "#FFCC00",
				fillOpacity: 0.3,
				zIndex: 0
			});

			// Añade a las listas globales las variables a almacenar de cada cmss
			polys_cmssv.push(poligono);
			polys_cmssv_limiteMax.push(limiteMax);
			polys_cmssv_limiteMin.push(limiteMin);
			cmssv_nombre.push(nombre);
			cmssv_punto.push(loc);
			cmssv_mensaGlobo.push(mensaGlobo);	
			cmssv_mensaGloboInforme.push(mensaGloboInforme);	

		}//for

	});
			
}

