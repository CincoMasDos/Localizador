function descarga_prqs() {

  descargaUrl("php/phpsqlgenxml_localizador.php?tipo=parroquias&iddiocesana=" + iddiocesana, function(data) {
    var xml = data.responseXML;

    // Lee las polilíneas "parroquia"
    var parroquias = xml.documentElement.getElementsByTagName("parroquia");

    // Lee cada línea "parroquia" en "parroquias"
    for (var a = 0; a < parroquias.length; a++) {
  
      // Guarda los atributos de cada "parroquia"
      var nombre = parroquias[a].getAttribute("nombre");
      var direccion = parroquias[a].getAttribute("direccion");
      //var CP = parroquias[a].getAttribute("CP");
      //var localidad = parroquias[a].getAttribute("localidad");
      var telefono = parroquias[a].getAttribute("telefono");
      var fax = parroquias[a].getAttribute("fax");
      var e_mail = parroquias[a].getAttribute("e-mail");
      var url = parroquias[a].getAttribute("url");
      var atencion = parroquias[a].getAttribute("atencion1");
      var ropero = parroquias[a].getAttribute("ropero");
        if (ropero == 1) {ropero = "S&iacute;";}
        else {ropero = "No";}
      var datos_de = parroquias[a].getAttribute("datos_de");
      var observaciones = parroquias[a].getAttribute("observaciones");
      var nombre_vicaria = parroquias[a].getAttribute("nombre_vicaria");
      var nombre_arcip = parroquias[a].getAttribute("nombre_arcip");
      var lat = parroquias[a].getAttribute("lat");
      var lng = parroquias[a].getAttribute("lng");
      var loc = new google.maps.LatLng(parseFloat(lat),parseFloat(lng));
      var coordenadas = parroquias[a].getAttribute("coordenadas");
      
      // Preparamos los elementos que aparecerán en el globo
      if (telefono != "") {telefono = "<br><strong>Teléfono</strong>: "+telefono;}
      if (fax != "") {fax = "&nbsp;<strong>Fax</strong>: "+fax;}
      if (e_mail != "") {e_mail = "<strong>e-mail</strong>: "+e_mail+"&nbsp;&nbsp;";}
      if (url != "") {var url2 = "<b>Web</b>: "+url;} //para el informe
      if (url != "") {url = "<a href='"+url+"'>Web</a>";}
      else {var url2 = "";}      
        if (e_mail != "" || url != "") {
          var e_mail_url = "<br>"+e_mail+""+url;
          var e_mail_url2 = "<br>"+e_mail+""+url2;
        }
        else {
          var e_mail_url = ""+e_mail+""+url;
          var e_mail_url2 = ""+e_mail+""+url2;          
        }
      if (atencion != "") {atencion ="<br><br><strong>Días y horarios de atención</strong>:<br>"+atencion;}
      if (observaciones != "") {observaciones = "<br><strong>Observaciones</strong>: "+observaciones;}
      
         // Los globos de VALENCIA han de incluir el arciprestazgo, la vicaría y el año del que son los datos 
         if (iddiocesana == 219) {
             if (datos_de != "") {datos_de = "<strong>Datos de </strong>"+datos_de;}
             else {datos_de = "<strong>Datos de</strong> año desconocido";}
             nombre_vicaria = "<br><br><strong>Vicaria</strong>: "+nombre_vicaria;
	     nombre_arcip ="<br><strong>Arciprestazgo</strong>: "+nombre_arcip+"<br><br>";   
             observaciones = observaciones + datos_de + nombre_vicaria + nombre_arcip;
         }

              
      var mensaGlobo = "<img src='estilos/img/globos-caritas.png' width='20' height='20'>"+
        "<strong>&nbsp;&nbsp;CÁRITAS "+nombre+"</strong>"+
        "<br><hr><strong>Direccion</strong>: "+direccion+""+
        telefono+fax+e_mail_url+
        atencion+
        "<br><br>"+observaciones+ 
        "<br>";
      //Igual que el anterior, pero con "e_mail_url2" (para el informe)
      var mensaGloboInforme = "<img src='estilos/img/globos-caritas.png' width='20' height='20'>"+
        "<strong>&nbsp;&nbsp;CÁRITAS "+nombre+"</strong>"+
        "<br><hr><strong>Direccion</strong>: "+direccion+""+
        telefono+fax+e_mail_url2+
        atencion+
        "<br><br>"+observaciones+
        "<br>";
      
      
      // Construye la lista de puntos "pts" y determina el punto de mayor latlng y el de menor 
      var resultados = limitesPolyXML(coordenadas);
      var pts = resultados[0];
      var limiteMax = resultados[1];
      var limiteMin = resultados[2];

      // Crea un polígono con la lista de puntos "pts"
      var poligono = new google.maps.Polygon({
        paths: pts,
        strokeColor: "#FF3300",
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: "#66FF33",
        fillOpacity: 0.3,
        zIndex: 1
      });

      // Añade a las listas globales las variables a almacenar de cada parroquia
      polys_prqs.push(poligono);
      polys_prqs_limiteMax.push(limiteMax);
      polys_prqs_limiteMin.push(limiteMin);
      prqs_nombre.push(nombre);
      prqs_punto.push(loc);
      prqs_mensaGlobo.push(mensaGlobo);
      prqs_mensaGloboInforme.push(mensaGloboInforme);  
      
    }//for 

  });

}
