function globoEnCasa() {

  var anyade;
  var listaMiMensaje = "";
  no_disp = [];
  miMensaGlobo = "<div class='globos2'>Esta es la localización de la dirección "+
            "que has facilitado:<br><strong>"+direccionAbuscar+"</strong></div>";
            
  infoGlobo.close();
  Globo = false; 
  
  if (tipoBusqueda != "todas") {
        
    // Si hay algún recurso no disponible (de los solicitados),
    // añadimos a la lista no_disp una cadena de texto que identifique el recurso 
    // no disponible de los solicitados
    if (est_marcas_prq || est_demarc_prq) {
      anyade = false;
      switch (tipoBusqueda) {
        case "direccion":;  if (prqs_marcas_direc.length == 0) {anyade = true;}; break;
        case "radio":;      if (prqs_marcas_radio.length == 0) {anyade = true;}; break;          
      }
      if (anyade) {no_disp.push("Centros de Cáritas");}
    }
    if (est_marcas_cmssv || est_demarc_cmssv) {
      anyade = false;
      switch (tipoBusqueda) {
        case "direccion":;  if (cmssv_marcas_direc.length == 0) {anyade = true;}; break;
        case "radio":;      if (cmssv_marcas_radio.length == 0) {anyade = true;}; break;
      }
      if (anyade) {no_disp.push("Centro Municipal de Servicios Sociales");}
    }
    if (est_marcas_cINTRA) {
      anyade = false;
      switch (tipoBusqueda) {
        case "direccion":;  if (cINTRA_marcas_direc.length == 0) {anyade = true;}; break;
        case "radio":;      if (cINTRA_marcas_radio.length == 0) {anyade = true;}; break;
      }
      if (anyade) {no_disp.push("Contenedores ropa");}
    }
    if (est_marcas_arropa) {
      anyade = false;
      switch (tipoBusqueda) {
        case "direccion":;  if (arropa_marcas_direc.length == 0) {anyade = true;}; break;
        case "radio":;      if (arropa_marcas_radio.length == 0) {anyade = true;}; break;
      }
      if (anyade) {no_disp.push("Tiendas ropa");}
    }
    if (est_marcas_ot) {
      anyade = false;
      switch (tipoBusqueda) {
        case "direccion":;  if (auxListasOt(otTipo)[4].length == 0) {anyade = true;}; break;
        case "radio":;      if (auxListasOt(otTipo)[5].length == 0) {anyade = true;}; break;
      }
      if (anyade) {no_disp.push("Otros: '"+auxListasOt(otTipo)[7]+"'");}
    }          

    // Creamos el listado de tipos de recursos solicitados que no están disponibles            
    for (i=0; i<no_disp.length; i++) {
      listaMiMensaje = ""+listaMiMensaje+"<li>"+no_disp[i]+"</li>";
    } 

    //Si hay que indicar algún recurso no disponible
    if (no_disp.length > 0) {
    
       // actualizamos el mensaje del globo en nuestra marca de posición
       miMensaGlobo = "<div class='globos'>Esta es la localización de la dirección "+
                  "que has facilitado:<br><strong>"+direccionAbuscar+"</strong>"+
                  "<br>De los recursos solicitados no hay disponibles:"+
                  "<ul>"+listaMiMensaje+"</ul></div>";
      // guardamos la posicion central antes de abrir el globo
      centro = map.getCenter();
      // y abrimos globo en mi_marca indicando los recursos no disponibles
      infoGlobo.setContent(miMensaGlobo);
      infoGlobo.open(map, mi_marca);
      Globo = true;
       
    }

  } //if (tipoBusqueda != "todas")
          
  // Si he cerrado el globo en mi_marca, lo vuelve a mostrar pinchando en ella
  google.maps.event.addListener(mi_marca, "click", function() {
    infoGlobo.setContent(miMensaGlobo);
    infoGlobo.open(map, mi_marca);
    Globo = true;
  });
  
  
  
}
