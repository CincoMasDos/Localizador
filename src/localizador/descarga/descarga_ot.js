function descarga_ot() {

  descargaUrl("php/phpsqlgenxml_localizador.php?tipo=otrosRecursos&iddiocesana=" + iddiocesana, function(data) {
    var xml = data.responseXML;

    // Lee las polilíneas "otros"
    var ot = xml.documentElement.getElementsByTagName("otro_recurso");

    // Lee cada línea "otro_recurso" en "ot"
    for (var a = 0; a < ot.length; a++) {
  
      // Guarda los atributos de cada "otRec"
      var nom = ot[a].getAttribute("nombre");
      var direccion = ot[a].getAttribute("direccion");
      var localidad = ot[a].getAttribute("localidad");
      var telefono = ot[a].getAttribute("telefono");
      var e_mail = ot[a].getAttribute("e-mail");
      var url = ot[a].getAttribute("url");
      var horario = ot[a].getAttribute("horario");
      var descripcion = ot[a].getAttribute("descripcion");
      var observaciones = ot[a].getAttribute("observaciones");
      var lat = ot[a].getAttribute("lat");
      var lng = ot[a].getAttribute("lng");
      var ids_tipo_recurso = ot[a].getElementsByTagName("idOt");
        var idsOt = [];
        for (var i = 0; i < ids_tipo_recurso.length; i++) {
          var idOt = parseFloat(ids_tipo_recurso[i].getAttribute("idOt"));
          idsOt.push(idOt);    
        }
      var tipo = "";
        for (var i = 0; i < idsOt.length; i++) {
          if (i != 0) {tipo = ""+tipo+"; ";}
          tipo = ""+tipo+""+auxListasOt(idsOt[i])[7]+"";
        }
    
      var loc = new google.maps.LatLng(parseFloat(lat),parseFloat(lng));
      
      // Preparamos los elementos que aparecerán en el globo
      if (telefono != "") {telefono = telefono+"&nbsp;";}
      if (e_mail != "") {e_mail = e_mail+"&nbsp;";}
      if (url != "") {var url2 = "<b>Web</b>: "+url;}
      if (url != "") {url = "<a href='"+url+"'>Web</a>";}
        if (telefono != "" ||  e_mail != "" || url != "") {
          var telefono_e_mail_url = "<br>"+telefono+e_mail+url+"<br>";
          var telefono_e_mail_url2 = "<br>"+telefono+e_mail+url2+"<br>";
        }
        else {
          var telefono_e_mail_url = ""+telefono+e_mail+url;
          var telefono_e_mail_url2 = ""+telefono+e_mail+url2;
        }
      if (horario != "") {horario = "<br><strong>Horario: </strong>"+horario+"<br>";}
      if (descripcion != "") {descripcion = "<br><strong>Descripción: </strong>"+descripcion+"<br>";}
      if (observaciones != "") {observaciones = "<br><strong>Observaciones: </strong>"+observaciones+"<br>";}
            
      var mGlob = "<strong>"+nom+"</strong><hr>"+
        ""+direccion+" ("+localidad+")"+telefono_e_mail_url+horario+descripcion+observaciones+
        "<br><strong>Recurso clasificado bajo: </strong>"+tipo+"<br><br>";
      // 
      var mGlobInforme = "<strong>"+nom+"</strong><hr>"+
        ""+direccion+" ("+localidad+")"+telefono_e_mail_url2+horario+descripcion+observaciones+
        "<br><strong>Recurso clasificado bajo: </strong>"+tipo+"<br><br>";
   
   
      // Añade a las listas globales las variables a almacenar de cada recurso
      for (var i = 0; i < idsOt.length; i++) {
        auxListasOt(idsOt[i])[0].push(nom);
        auxListasOt(idsOt[i])[1].push(loc);
        auxListasOt(idsOt[i])[2].push(mGlob);
        auxListasOt(idsOt[i])[6].push(mGlobInforme);
      }
 
    }//for

  });

}
