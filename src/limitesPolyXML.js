function limitesPolyXML (coordenadas) {
	var puntos = coordenadas.split(" ");
	var pts = [];
	var latlngPtoInicial = puntos[0].split(",");
	var latMax = parseFloat(latlngPtoInicial[1]);
	var latMin = parseFloat(latlngPtoInicial[1]);
	var lngMax = parseFloat(latlngPtoInicial[0]);
	var lngMin = parseFloat(latlngPtoInicial[0]);
	for (var i = 0; i < puntos.length; i++) {
		var latlngPto = puntos[i].split(",");
		var latPoly = parseFloat(latlngPto[1]);
		var lngPoly = parseFloat(latlngPto[0]);
		var esLatMax = false;
		var esLatMin = false;
		var esLngMax = false;
		var esLngMin = false;
		if (latPoly>latMax) {
			esLatMax=true;
		} 
		if (latPoly<latMin) {
			esLatMin=true;
		}
		if (lngPoly>lngMax) {
			esLngMax=true;
		} 
		if (lngPoly<lngMin) {
			esLngMin=true;
		}
		if (esLatMax) {latMax=latPoly}
		if (esLatMin) {latMin=latPoly}
		if (esLngMax) {lngMax=lngPoly}
		if (esLngMin) {lngMin=lngPoly}
				
		pts[i] = new google.maps.LatLng(latPoly,lngPoly);
	}
	var limiteMax = new google.maps.LatLng(latMax,lngMax);
	var limiteMin = new google.maps.LatLng(latMin,lngMin);
	var resultados = [pts,limiteMax,limiteMin];
	return resultados
}
