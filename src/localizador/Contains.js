google.maps.Polygon.prototype.Contains = function(punto) {

	var contiene = false;
	
	var path = this.getPath();
	var numPuntos = path.getLength();
	
	//var j=numPuntos-1;
	var j=0;
	
	var X = punto.lng();
	var Y = punto.lat();
	
	for (var i=0; i < numPuntos; i++) {
		j++;
		if (j == numPuntos) {j = 0;}
		var x1 = path.getAt(i).lng();
		var y1 = path.getAt(i).lat();
		var x2 = path.getAt(j).lng();
		var y2 = path.getAt(j).lat();
		if (((y1 < Y) && (y2 >= Y)) || ((y2 < Y) && (y1 >= Y))) {
				if ( x1 + (Y - y1) /  (y2-y1) * (x2 - x1)<X ) {
					contiene = !contiene;
				}
		}
	}
	return contiene;
}  
