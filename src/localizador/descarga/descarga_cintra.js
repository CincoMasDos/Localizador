function descarga_cintra() {

  descargaUrl("php/phpsqlgenxml_localizador.php?tipo=contenINTRA&iddiocesana=" + iddiocesana, function(data) {
    var xml = data.responseXML;

    // Lee las polilíneas "contenedor"
    var cINTRA = xml.documentElement.getElementsByTagName("contenedor");

    // Lee cada línea "contenedor" en "cINTRA"
    for (var a = 0; a < cINTRA.length; a++) {
    
      // Guarda los atributos de cada "contenedor"
      var nombre = cINTRA[a].getAttribute("nombre");
      var direccion = cINTRA[a].getAttribute("direccion");
      var CP = cINTRA[a].getAttribute("CP");
      var localidad = cINTRA[a].getAttribute("localidad");
      var descripcion = cINTRA[a].getAttribute("descripcion");
      var lat = cINTRA[a].getAttribute("lat");
      var lng = cINTRA[a].getAttribute("lng");
      var loc = new google.maps.LatLng(parseFloat(lat),parseFloat(lng));

        // Determinamos la imagen del contenedor en función de la diocesana (por defecto, la de Valencia)
        var imgCont;
        switch(iddiocesana) {
          case 146: imgCont = "<img src='estilos/img/146-contenedor.png' width='135' height='135'>"; break;
          case 219: imgCont = "<img src='estilos/img/contenedor_arropa.jpg' width='90' height='135'>"; break;
          default: imgCont = "<img src='estilos/img/contenedor_arropa.jpg' width='90' height='135'>";
        } 
         
      //var mensaGlobo = "Contenedor @ropa:<br><strong>"+nombre+"</strong><br>"+imgCont+"<br><br>";
      // Determinamos el mensaje del globo del contenedor en función de la diocesana 
      // (por defecto, la de Valencia)
      var mensaGlobo;
      switch(iddiocesana) {
        case 146: mensaGlobo = "Contenedor de ropa (Koopera – Cáritas) :<br><strong>"+nombre+
                               "</strong><br>"+direccion+"<br>"+CP+" "+localidad+"<br><br>"+
                               descripcion+"<br><br>"+imgCont+"<br><br>"; break;
        case 219: imgCont = "<img src='estilos/img/contenedor_arropa.jpg' width='90' height='135'>"; break;
        default: imgCont = "<img src='estilos/img/contenedor_arropa.jpg' width='90' height='135'>";
      } 
      
      // Añade a las listas globales las variables a almacenar de cada contenedor
      cINTRA_nombre.push(nombre);
      cINTRA_punto.push(loc);
      cINTRA_mensaGlobo.push(mensaGlobo);  
  
    }//for

  });

}
