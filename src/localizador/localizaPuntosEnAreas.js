// *************************************************************************************************
// **********************      localizaPuntosEnAreas(...)    ***************************************
// *************************************************************************************************
// 
// Descripción: Función auxiliar que localiza y dibuja los recursos (con marcas y demarcaciones
//					 asociados) solicitados bajo las condiciones de búsqueda (tipo de búsqueda, 
//					 dirección, radio...)
// Llamada por: 
//		- Función localizaRecursos()
// Invoca a:
//		- Función auxMarcasDemarcAlmacenadas(...)
//		- Función auxMarca(...)
//		- Función listenerAbrirGlobo(...)
//		- Función auxMarcaDemarcNueva(...)
//		- Método contains
//		- Función distanciaEntre(...)
// Recibe:
//		- tipoInfo						: Identificador del tipo de recurso (para la utilidad
//											  añadir a informe
//		- est_marcas					: Valor de la variable que controla el estado (activo
//											  o no) de las marcas de este tipo de recurso
//		- est_demarc					: Valor de la variable que controla el estado (activo
//											  o no) de las demarcaciones de este tipo de recurso
//		- marcas_todas					: listas de marcas, demarcaciones y límites de
//		- marcas_direc					  elementos que ya se han dibujado en el mapa
//		- marcas_radio
//		- demarc_todas
//		- demarc_direc
//		- demarc_direc_limiteMax,
//		- demarc_direc_limiteMin,
//		- demarc_radio
//		- demarc_radio_limiteMax,
//		- demarc_radio_limiteMin,
//		- mensaGlobo[]					: lista de mensajes de cada uno de los recursos 
//		- puntos[]						: lista de los puntos de cada uno de los recursos
//		- polys[]						: lista de objetos polígono de cada una de las demarcaciones
//		- polys_limiteMax				: lista de puntos de mayor latitud y longitud de cada polígono
//		- polys_limiteMin				: lista de puntos de menor latitud y longitud de cada polígono
//		- imagen							: imagen del icono para la marca de este tipo de recursos
//		- sombra							: sombra del icono para la marca de este tipo de recursos
// Devuelve: 
//		resultados = [marcas_todas,
//						  marcas_direc,
//						  marcas_radio,
//						  demarc_todas,
//						  demarc_direc,
//						  demarc_direc_limiteMax,
//						  demarc_direc_limiteMin,
//						  demarc_radio,
//						  demarc_radio_limiteMax,
//						  demarc_radio_limiteMin]
// Variables locales: 
//		- i				: contador
//		- mGlobo			: contenido del globo info de cada recurso localizado
//		- marca			: marca de cada recurso localizado
//		- dev				: lista devuelta por las funciones:
//									auxMarca(...)
//									auxMarcasDemarcAlmacenadas
//		- resultados[]	: lista que almacena los elementos a devolver
// Variables Globales
//		- tipoBusqueda
//		- radioBusqueda
//		- casa

function localizaPuntosEnAreas(tipoInfo,
										 est_marcas,
										 est_demarc,
										 marcas_todas,
										 marcas_direc,
										 marcas_radio,
										 demarc_todas,
										 demarc_direc,
										 demarc_direc_limiteMax,
				  						 demarc_direc_limiteMin,
										 demarc_radio,
										 demarc_radio_limiteMax,
				  						 demarc_radio_limiteMin,
										 mensaGlobos,
										 puntos,
										 polys,
										 polys_limiteMax,
										 polys_limiteMin,
										 imagen,
										 sombra) {	

	//Declaración y/o inicialización de variables locales
	var i;
	var mGlobo;
	var marca;
	var dev;
	var resultados = [];
	
	
	switch (tipoBusqueda) {
	
		// Si se han de mostrar todas
		case "todas":
			if (marcas_todas.length > 0) { // || demarc_todas.length > 0	
				auxMarcasDemarcAlmacenadas(est_marcas,
													est_demarc,
													marcas_todas,
													demarc_todas,
													polys_limiteMax,
													polys_limiteMin);
			}

			else { // marcas_todas.length == 0 || demarc_todas.length == 0				
				for (i=0; i<puntos.length; i++) {
					dev = auxMarca(i,puntos[i],mensaGlobos[i],tipoInfo,imagen,sombra);
					marca = dev[0];
					mGlobo = dev[1];
					listenerAbrirGlobo(polys[i],mGlobo);
					marcas_todas.push(marca);
					demarc_todas.push(polys[i]);	
					auxMarcaDemarcNueva(est_marcas,
											  est_demarc,
											  marca,
											  polys[i],
											  polys_limiteMax[i],
											  polys_limiteMin[i]);					
				}
			}
			break;
			
		// Si ha de mostrarse sólo la correspondiente por direccion
		case "direccion":
			if (marcas_direc.length > 0) { // || demarc_direc.length > 0	
				auxMarcasDemarcAlmacenadas(est_marcas,
													est_demarc,
													marcas_direc,
													demarc_direc,
													demarc_direc_limiteMax,
													demarc_direc_limiteMin);
			}
			
			else { // marcas_direc.length == 0 || demarc_direc.length == 0	
				// Evalua la lista de poligonos para ver si alguno contiene el punto
				bucle :
				for (i=0; i<polys.length; i++) {
					if (polys[i].Contains(casa)) {
						dev = auxMarca(i,puntos[i],mensaGlobos[i],tipoInfo,imagen,sombra);
						marca = dev[0];
						mGlobo = dev[1];
						listenerAbrirGlobo(polys[i],mGlobo);
						marcas_direc.push(marca);
						demarc_direc.push(polys[i]);
						demarc_direc_limiteMax.push(polys_limiteMax[i]);
						demarc_direc_limiteMin.push(polys_limiteMin[i]);
						auxMarcaDemarcNueva(est_marcas,
												  est_demarc,
												  marca,
												  polys[i],
												  polys_limiteMax[i],
												  polys_limiteMin[i]);
						break bucle;
					} //if
				} //for				
			}
			break;
								
		// Si ha de mostrarse sólo las que están en un radio de búsqueda
		case "radio":	
			if (marcas_radio.length > 0 ) { // || demarc_radio.length > 0) {	
				auxMarcasDemarcAlmacenadas(est_marcas,
													est_demarc,
													marcas_radio,
													demarc_radio,
													demarc_radio_limiteMax,
													demarc_radio_limiteMin);
			}
			
			else { // marcas_radio.length == 0 || demarc_radio.length == 0) 			
				for (i=0; i<puntos.length; i++) {
					if (distanciaEntre(puntos[i],casa) < radioBusqueda) {
						dev = auxMarca(i,puntos[i],mensaGlobos[i],tipoInfo,imagen,sombra);
						marca = dev[0];
						mGlobo = dev[1];
						listenerAbrirGlobo(polys[i],mGlobo);
						marcas_radio.push(marca);
						demarc_radio.push(polys[i]);
						demarc_radio_limiteMax.push(polys_limiteMax[i]);
						demarc_radio_limiteMin.push(polys_limiteMin[i]);	
						auxMarcaDemarcNueva(est_marcas,
															  est_demarc,
															  marca,
															  polys[i],
															  polys_limiteMax[i],
															  polys_limiteMin[i]);
					}
				}
			}
			break;
			
	}//switch		   				   
			
	resultados = [marcas_todas,
				  marcas_direc,
				  marcas_radio,
				  demarc_todas,
				  demarc_direc,
				  demarc_direc_limiteMax,
				  demarc_direc_limiteMin,
				  demarc_radio,
				  demarc_radio_limiteMax,
				  demarc_radio_limiteMin]
				  	
	return resultados;
	
}
