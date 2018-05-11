function vaciarInforme() {
	document.getElementById("informe").innerHTML= "";
	document.getElementById("listaInforme").innerHTML= "";
}
		
function vistaPreviaInforme(contenido) {
	var ficha = document.getElementById(contenido);
	var ventimp = window.open(' ');
	ventimp.document.write("<div style='font-family: Arial; font-size: 0.8em;'>"+ficha.innerHTML+"</div>");
} 

function imprInforme(contenido) {
	var ficha = document.getElementById(contenido);
	var ventimp = window.open(' ', 'popimpr');
	ventimp.document.write("<div style='font-family: Arial; font-size: 0.8em;'>"+ficha.innerHTML+"</div>");
	ventimp.document.close();
	ventimp.print();
	ventimp.close();
}
