// ************************************************************************************************
// ***********************      Función separadorMiles(nStr)      *********************************
// ************************************************************************************************
//
// Descripción: Devuelve una cadena de texto con el número facilitado con formato de 
//              separador de miles. Si el número no es mayor o igual que mil, aunque 
//              se le aplica la función, su efecto no se aprecia en el resultado.
// Llamada por: 
//    función construyeLeyenda(...) 
// Invoca a:
//    nada
// Recibe: 
//    nStr
// Devuelve: 
//    nStr formateado a separador de miles    
// Variables globales:
//    ninguna

function separadorMiles(nStr)   {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}

