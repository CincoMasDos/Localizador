function anyadiraInforme(i,tipoInfo) {
  infoGlobo.close();
  map.setCenter(centro);

  if (tipoInfo == 1) {      
    document.getElementById("informe").innerHTML+= "<div style='position:relative; "+
                                          " float:left; "+
                                          " margin:20px 0 0 0'>"+
      "<IMG style=' position:relative; "+
              " float:left; "+
              " right:10px; '"+
              " src='http://maps.google.com/maps/api/staticmap?"+
              " center="+prqs_punto[i].lat()+","+prqs_punto[i].lng()+""+
              " &zoom=16 "+
              " &size=275x275 "+
              " &markers="+
              "icon:http://www.utopika.upv.es/caritas/imagenes/caritas.png|"+
              ""+prqs_punto[i].lat()+","+prqs_punto[i].lng()+""+
              " &sensor=false'</IMG>"+
      ""+prqs_mensaGloboInforme[i]+"</div>";
          
    document.getElementById("listaInforme").innerHTML+= "<li>Cáritas "+prqs_nombre[i]+"</li>";
  }
      
  else if (tipoInfo == 2) {
    document.getElementById("informe").innerHTML+= "<div style='position:relative; "+
                                          " float:left; "+
                                          " margin:20px 0 0 0'>"+
      "<IMG style=' position:relative; "+
              " float:left; "+
              " right:10px; '"+
              " src='http://maps.google.com/maps/api/staticmap?"+
              " center="+cmssv_punto[i].lat()+","+cmssv_punto[i].lng()+""+
              " &zoom=16 "+
              " &size=275x275 "+
              " &markers="+
              "icon:http://www.utopika.upv.es/caritas/imagenes/ayto_valencia.png|"+
              ""+cmssv_punto[i].lat()+","+cmssv_punto[i].lng()+""+
              " &sensor=false'</IMG>"+
      ""+cmssv_mensaGloboInforme[i]+"</div>";
          
    document.getElementById("listaInforme").innerHTML+= "<li>CMSS "+cmssv_nombre[i]+"</li>";
  }
      
  else if (tipoInfo == 3) {
    document.getElementById("informe").innerHTML+= "<div style='position:relative; "+
                                          " float:left; width: 700px;"+
                                          " margin:20px 0 0 0'>"+
      "<IMG style=' position:relative; "+
              " float:left; "+
              " right:10px; '"+
              " src='http://maps.google.com/maps/api/staticmap?"+
              " center="+cINTRA_punto[i].lat()+","+cINTRA_punto[i].lng()+""+
              " &zoom=16 "+
              " &size=275x275 "+
              " &markers="+
              "icon:http://www.utopika.upv.es/caritas/imagenes/contenINTRA.png|"+
              ""+cINTRA_punto[i].lat()+","+cINTRA_punto[i].lng()+""+
              " &sensor=false'</IMG>"+        
      ""+cINTRA_mensaGlobo[i]+"</div>";
        
    document.getElementById("listaInforme").innerHTML+= "<li>Contenedor "+cINTRA_nombre[i]+"</li>";      
  }
  else if (tipoInfo == 4) {
    document.getElementById("informe").innerHTML+= "<div style='position:relative; "+
                                          " float:left; width: 700px;"+
                                          " margin:20px 0 0 0'>"+
      "<IMG style=' position:relative; "+
              " float:left; "+
              " right:10px; '"+
              " src='http://maps.google.com/maps/api/staticmap?"+
              " center="+arropa_punto[i].lat()+","+arropa_punto[i].lng()+""+
              " &zoom=16 "+
              " &size=275x275 "+
              " &markers="+
              "icon:http://www.utopika.upv.es/caritas/imagenes/tiendas_arropa.png|"+
              ""+arropa_punto[i].lat()+","+arropa_punto[i].lng()+""+
              " &sensor=false'</IMG>"+        
      ""+arropa_mensaGlobo[i]+"</div>";
          
    document.getElementById("listaInforme").innerHTML+= "<li>Tienda @rropa "+arropa_nombre[i]+"</li>";      
  }
  
  else if (tipoInfo == 501 ||
        tipoInfo == 502 ||
        tipoInfo == 503 ||
        tipoInfo == 504 ||
        tipoInfo == 505 ||
        tipoInfo == 506 ||
        tipoInfo == 507 ||
        tipoInfo == 508 ||
        tipoInfo == 509 ||
        tipoInfo == 510 ||
        tipoInfo == 511 ||
        tipoInfo == 512 ||
        tipoInfo == 513 ||
        tipoInfo == 514 ||
        tipoInfo == 515 ||
        tipoInfo == 516 ||
        tipoInfo == 517 ||
        tipoInfo == 518 ||
        tipoInfo == 519 ) {
    document.getElementById("informe").innerHTML+= "<div style='position:relative; "+
                                          " float:left; width: 700px;"+
                                          " margin:20px 0 0 0'>"+
      "<IMG style=' position:relative; "+
              " float:left; "+
              " right:10px; '"+
              " src='http://maps.google.com/maps/api/staticmap?"+
              " center="+auxListasOt(tipoInfo)[1][i].lat()+","+auxListasOt(tipoInfo)[1][i].lng()+""+
              " &zoom=16 "+
              " &size=275x275 "+
              " &markers="+
              "icon:http://www.utopika.upv.es/caritas/imagenes/ot.png|"+
              ""+auxListasOt(tipoInfo)[1][i].lat()+","+auxListasOt(tipoInfo)[1][i].lng()+""+
              " &sensor=false'</IMG>"+        
      ""+auxListasOt(tipoInfo)[6][i]+"</div>";
          
    document.getElementById("listaInforme").innerHTML+= "<li>"+auxListasOt(tipoInfo)[0][i]+"</li>";      
  }
  
}
