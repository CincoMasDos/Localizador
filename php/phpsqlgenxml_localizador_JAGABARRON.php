<?php 
header("Content-type: text/xml");
 
error_reporting(-1);
ini_set('display_errors', 'On');

require("phpsql_dbinfo.php"); 


// Tomamos de la URL el parámetro que nos indica el tipo de elemento a generar
$tipo = $_GET["tipo"]; 
// Tomamos de la URL el parámetro que nos indica la diocesana
$iddiocesana = $_GET["iddiocesana"];

// Tomamos de la URL el parámetro que nos indica el tipo de elemento a generar
//$tipo = "parroquias"; 
// Tomamos de la URL el parámetro que nos indica la diocesana
//$iddiocesana = "146";


// Iniciamos el archivo XML y creamos el nodo padre
$dom = new DOMDocument("1.0");
if ($tipo=="parroquias") {
	$nodo = $dom->createElement("parroquias");
}
elseif ($tipo=="cmssv") {
	$nodo = $dom->createElement("cmssv");
}
elseif ($tipo=="contenINTRA") {
	$nodo = $dom->createElement("contenINTRA");
}
elseif ($tipo=="arropa") {
	$nodo = $dom->createElement("arropa");
}
elseif ($tipo=="otrosRecursos") {
	$nodo = $dom->createElement("otrosRecursos");
}
$nodo_padre = $dom->appendChild($nodo); 


// Abrimos la conexión con el servidor MySQL
$conexion = mysql_connect ($host, $username, $password);
if (!$conexion) {  die('No se ha conectado: ' . mysql_error());} 


// Establecemos la base de datos a utilizar
$db_selected = mysql_select_db($database, $conexion);
if (!$db_selected) {
  die ('No se puede usar la base de datos: ' . mysql_error());
} 


// Realizamos la consulta a la base de datos para generar los resultados 
// desde los que construiremos el XML

if ($tipo=="parroquias") {
	// En este caso, será content_type_parroquias añadiéndole algunos campos de las tablas
	// geo_comarcas, geo_arciprestazgos, geo_vicarias y content_type_parroquias_geo.
	// De todos los registros posibles, sólo nos interesarán los que vayan a utilizarse 
	// en el localizador (utilizamos LEFT OUTER JOIN en vez de INNER JOIN para hacer una
	// combinación externa -que no sea excluyente- para que así aparezca la sede central
	// que no tiene arcip ni vicaría
	mysql_query("SET SQL_BIG_SELECTS=1"); // indicamos esto para ampliart la consulta y que permita
																		// la relación de tablas de muchos registros
	$query = "SELECT * 
				FROM content_type_parroquias 
				LEFT JOIN geo_comarcas ON content_type_parroquias.field_prq_id_comarca_value = geo_comarcas.id_comarca
				LEFT JOIN geo_arciprestazgos ON content_type_parroquias.field_prq_id_arcip_value = geo_arciprestazgos.id_arcip
				LEFT JOIN geo_vicarias ON content_type_parroquias.field_prq_id_vicaria_value = geo_vicarias.id_vicaria
				LEFT JOIN content_type_parroquias_geo ON content_type_parroquias.field_prq_id_value = content_type_parroquias_geo.field_prq_geo_id_value
			 WHERE 1 AND content_type_parroquias.field_prq_iddiocesana_value=". $iddiocesana;
	//echo $query;
}
elseif ($tipo=="cmssv") {
	$query = "SELECT * FROM content_type_cmss WHERE 1 and content_type_cmss.field_cmss_iddiocesana_value=". $iddiocesana;
}
elseif ($tipo=="contenINTRA") {
	$query = "SELECT * FROM content_type_contenedoresintra WHERE 1 and 		content_type_contenedoresintra.field_prq_iddiocesana_value=". $iddiocesana;
}
elseif ($tipo=="arropa") {
	$query = "SELECT * FROM content_type_tiendas_arropa WHERE 1 and content_type_arropa.field_arropa_iddiocesana_value=". $iddiocesana;
}
elseif ($tipo=="otrosRecursos") {
	$query = "SELECT * FROM content_type_otros_recursos WHERE 1 and content_type_otros_recursos.field_otros_recursos_iddiocesana_value=". $iddiocesana;
}


// Recogemos los resultados de la consulta
$resultados = mysql_query($query);
if (!$resultados) {  
  die('Error en la consulta a la base de datos: ' . mysql_error());
} 

header("Content-type: text/xml"); 


// Iteramos a través de cada registro de resultados, 
// añadiendo, para cada uno, los correspondientes nodos XML

if ($tipo=="parroquias") {
	while ($row = @mysql_fetch_assoc($resultados)){  
	  $nodoprq = $dom->createElement("parroquia");  
	  $nuevo_nodo = $nodo_padre->appendChild($nodoprq);  
		//$nuevo_nodo->setAttribute("id_parroquia",$row['field_prq_id_value']);
		$vicaria = $row['field_prq_id_vicaria_value'].". ".utf8_encode($row['nombre_vicaria']);
		$nuevo_nodo->setAttribute("nombre_vicaria",$vicaria);
		$arcip = $row['field_prq_id_arcip_value'].". ".utf8_encode($row['nombre_arcip']);
		$nuevo_nodo->setAttribute("nombre_arcip",$arcip);	
		//$nuevo_nodo->setAttribute("CP",$row['field_prq_cp_value']);
		//$nuevo_nodo->setAttribute("localidad",utf8_encode($row['field_prq_localidad_value']));			
		$nuevo_nodo->setAttribute("nombre",utf8_encode($row['field_prq_nombre_value']));								
		$nuevo_nodo->setAttribute("observaciones",utf8_encode($row['field_prq_observaciones_value']));	
		$nuevo_nodo->setAttribute("direccion",utf8_encode($row['field_prq_direcccion_value']));			
		$nuevo_nodo->setAttribute("telefono",$row['field_prq_telefono_value']);	
		$nuevo_nodo->setAttribute("fax",$row['field_prq_fax_value']);					
		$nuevo_nodo->setAttribute("e-mail",utf8_encode($row['field_prq_email_value']));	
		$nuevo_nodo->setAttribute("url",utf8_encode($row['field_prq_url_value']));		
		$nuevo_nodo->setAttribute("atencion1",utf8_encode($row['field_prq_atencion1_value']));	
		$nuevo_nodo->setAttribute("ropero",$row['field_prq_ropero_value']);	
		if ($row['field_prq_anyo_memoria_value'] != 0) {
			$anyo = $row['field_prq_anyo_memoria_value']	;
		}
		else {
			$anyo = "(no disponible)";
		}			    
		$nuevo_nodo->setAttribute("datos_de",$anyo);	    
		$nuevo_nodo->setAttribute("lat",$row['field_prq_geo_lat_value']);								
		$nuevo_nodo->setAttribute("lng",$row['field_prq_geo_lng_value']);
		$nuevo_nodo->setAttribute("coordenadas",$row['field_prq_geo_coordenadas_value']);									
		$coordenadas = $row['field_prq_geo_coordenadas_value'];
	} 
}
elseif ($tipo=="cmssv") {
	while ($row = @mysql_fetch_assoc($resultados)){  
	  $nodocmss = $dom->createElement("cmss");  
	  $nuevo_nodo = $nodo_padre->appendChild($nodocmss);  
		$nuevo_nodo->setAttribute("nombre",utf8_encode($row['field_cmssv_nombre_value']));
		$nuevo_nodo->setAttribute("direccion",utf8_encode($row['field_cmssv_direccion_value']));
		$nuevo_nodo->setAttribute("CP",$row['field_cmssv_cp_value']);
		$nuevo_nodo->setAttribute("localidad",utf8_encode($row['field_cmssv_localidad_value']));
		$nuevo_nodo->setAttribute("telefono",$row['field_cmssv_telefono_value']);
		$nuevo_nodo->setAttribute("obs_tel",utf8_encode($row['field_cmssv_obs_tel_value']));
		$nuevo_nodo->setAttribute("fax",$row['field_cmssv_fax_value']);
		$nuevo_nodo->setAttribute("e-mail",utf8_encode($row['field_cmssv_email_value']));
		$nuevo_nodo->setAttribute("url",utf8_encode($row['field_cmssv_url_value']));
		$nuevo_nodo->setAttribute("observaciones",utf8_encode($row['field_cmssv_observaciones_value']));
		$nuevo_nodo->setAttribute("lat",$row['field_cmssv_lat_value']);
		$nuevo_nodo->setAttribute("lng",$row['field_cmssv_lng_value']);
		$nuevo_nodo->setAttribute("coordenadas",$row['field_cmssv_coordenadas_value']);		
	} 
}
elseif ($tipo=="contenINTRA") {
	while ($row = @mysql_fetch_assoc($resultados)){  
	  $nodocontenedor = $dom->createElement("contenedor");  
	  $nuevo_nodo = $nodo_padre->appendChild($nodocontenedor);  
		$nuevo_nodo->setAttribute("nombre",utf8_encode($row['field_conten_nombre_value']));
		$nuevo_nodo->setAttribute("direccion",utf8_encode($row['field_conten_direccion_value']));
		$nuevo_nodo->setAttribute("CP",$row['field_conten_cp_value']);
		$nuevo_nodo->setAttribute("localidad",utf8_encode($row['field_conten_localidad_value']));
		$nuevo_nodo->setAttribute("descripcion",utf8_encode($row['field_conten_descripcion_value']));
		$nuevo_nodo->setAttribute("lat",$row['field_conten_lat_value']);
		$nuevo_nodo->setAttribute("lng",$row['field_conten_lng_value']);
	} 
}
elseif ($tipo=="arropa") {
	while ($row = @mysql_fetch_assoc($resultados)){  
	  $nodocontenedor = $dom->createElement("tiendaArropa");  
	  $nuevo_nodo = $nodo_padre->appendChild($nodocontenedor);  
		$nuevo_nodo->setAttribute("nombre",utf8_encode($row['field_tiendas_nombre_value']));
		$nuevo_nodo->setAttribute("direccion",utf8_encode($row['field_tiendas_direccion_value']));
		$nuevo_nodo->setAttribute("localidad",utf8_encode($row['field_tiendas_localidad_value']));
		$nuevo_nodo->setAttribute("telefono",$row['field_tiendas_telefono_value']);
		$nuevo_nodo->setAttribute("e-mail",utf8_encode($row['field_tiendas_email_value']));	
		$nuevo_nodo->setAttribute("horario",utf8_encode($row['field_tiendas_horario_value']));	
		$nuevo_nodo->setAttribute("observaciones",utf8_encode($row['field_tiendas_observaciones_value']));
		$nuevo_nodo->setAttribute("lat",$row['field_tiendas_lat_value']);
		$nuevo_nodo->setAttribute("lng",$row['field_tiendas_lng_value']);
	} 
}
elseif ($tipo=="otrosRecursos") {
	while ($row = @mysql_fetch_assoc($resultados)){  
	  $nodo_ot = $dom->createElement("otro_recurso");  
	  $nuevo_nodo = $nodo_padre->appendChild($nodo_ot);  
	  $nid = $row['nid'];
		$nuevo_nodo->setAttribute("nombre",utf8_encode($row['field_ot_nombre_value']));
		$nuevo_nodo->setAttribute("direccion",utf8_encode($row['field_ot_direccion_value']));
		$nuevo_nodo->setAttribute("localidad",utf8_encode($row['field_ot_localidad_value']));
		$nuevo_nodo->setAttribute("telefono",$row['field_ot_telefono_value']);
		$nuevo_nodo->setAttribute("e-mail",utf8_encode($row['field_ot_email_value']));
		$nuevo_nodo->setAttribute("url",utf8_encode($row['field_ot_url_value']));
		$nuevo_nodo->setAttribute("horario",utf8_encode($row['field_ot_horario_value']));
		$nuevo_nodo->setAttribute("descripcion",utf8_encode($row['field_ot_descripcion_value']));
		$nuevo_nodo->setAttribute("observaciones",utf8_encode($row['field_ot_observaciones_value']));
		$nuevo_nodo->setAttribute("lat",$row['field_ot_lat_value']);
		$nuevo_nodo->setAttribute("lng",$row['field_ot_lng_value']);
	
		// Buscamos en la tabla field_ot_tipo_recurso_value los tipos de recursos bajo los que está
		// clasificado el recurso del actual registro
		$query2 = sprintf("SELECT nid, field_ot_tipo_recurso_value 
								FROM content_field_ot_tipo_recurso 
								HAVING nid = %s",
			mysql_real_escape_string($nid));
		$resultados2 = mysql_query($query2);
		if (!$resultados2) {  
	  		die('Invalid query: ' . mysql_error());
		} 
		header("Content-type: text/xml"); 
		while ($row2 = @mysql_fetch_assoc($resultados2)){  
			$nodo2 = $dom->createElement("idOt");  
			$nuevo_nodo = $nodo_ot->appendChild($nodo2);  
			$nuevo_nodo->setAttribute("idOt",$row2['field_ot_tipo_recurso_value']);
		}	 
	} 
}

echo $dom->saveXML();

?>
