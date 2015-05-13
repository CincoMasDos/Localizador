// ***********************************************************************************************
// **********************      Función estableceRGB(color)      **********************************
// ***********************************************************************************************
//
// Descripción: 
//    Devuelve un vestor con los valores RGB del valor hexadecimal de un color de la lista
//    de "colores"
// Llamada por: 
//    función consultaBD()
// Invoca a:
//    nada
// Recibe: 
//    - color
// Devuelve: 
//    - colorRGB    
// Variables globales:
//    ninguna

function estableceRGB(color) {
   var colorRGB = new Array();
   switch (color) {
      case "#CD5C5C": colorRGB = [205,92,92];   break;
      case "#F08080": colorRGB = [240,128,128]; break;
      case "#FA8072": colorRGB = [250,128,114]; break;
      case "#E9967A": colorRGB = [233,150,122]; break;
      case "#FFA07A": colorRGB = [255,160,122]; break;
      case "#DC143C": colorRGB = [220,20,60];   break;
      case "#FF0000": colorRGB = [255,0,0];     break;
      case "#B22222": colorRGB = [178,34,34];   break;
      case "#8B0000": colorRGB = [139,0,0];     break;
      case "#FFC0CB": colorRGB = [255,192,203]; break;
      case "#FFB6C1": colorRGB = [255,182,193]; break;
      case "#FF69B4": colorRGB = [255,105,180]; break;
      case "#FF1493": colorRGB = [255,20,147];  break;
      case "#C71585": colorRGB = [199,21,133];  break;
      case "#DB7093": colorRGB = [219,112,147]; break;
      case "#FFA07A": colorRGB = [255,160,122]; break;
      case "#FF7F50": colorRGB = [255,127,80];  break;
      case "#FF6347": colorRGB = [255,99,71];   break;
      case "#FF4500": colorRGB = [255,69,0];    break;
      case "#FF8C00": colorRGB = [255,140,0];   break;
      case "#FFA500": colorRGB = [255,165,0];   break;
      case "#FFD700": colorRGB = [255,215,0];   break;
      case "#FFFF00": colorRGB = [255,255,0];   break;
      case "#FFFFE0": colorRGB = [255,255,224]; break;
      case "#FFFACD": colorRGB = [255,250,205]; break;
      case "#FAFAD2": colorRGB = [250,250,210]; break;
      case "#FFEFD5": colorRGB = [255,239,213]; break;
      case "#FFE4B5": colorRGB = [255,228,181]; break;
      case "#FFDAB9": colorRGB = [255,218,185]; break;
      case "#EEE8AA": colorRGB = [238,232,170]; break;
      case "#F0E68C": colorRGB = [240,230,140]; break;
      case "#BDB76B": colorRGB = [189,183,107]; break;
      case "#E6E6FA": colorRGB = [230,230,250]; break;
      case "#D8BFD8": colorRGB = [216,191,216]; break;
      case "#DDA0DD": colorRGB = [221,160,221]; break;
      case "#EE82EE": colorRGB = [238,130,238]; break;
      case "#DA70D6": colorRGB = [218,112,214]; break;
      case "#FF00FF": colorRGB = [255,0,255];   break;
      case "#BA55D3": colorRGB = [186,85,211];  break;
      case "#9370DB": colorRGB = [147,112,219]; break;
      case "#8A2BE2": colorRGB = [138,43,226];  break;
      case "#9400D3": colorRGB = [148,0,211];   break;
      case "#9932CC": colorRGB = [153,50,204];  break;
      case "#8B008B": colorRGB = [139,0,139];   break;
      case "#800080": colorRGB = [128,0,128];   break;
      case "#4B0082": colorRGB = [75,0,130];    break;
      case "#6A5ACD": colorRGB = [106,90,205];  break;
      case "#483D8B": colorRGB = [72,61,139];   break;
      case "#ADFF2F": colorRGB = [173,255,47];  break;
      case "#7FFF00": colorRGB = [127,255,0];   break;
      case "#7CFC00": colorRGB = [124,252,0];   break;
      case "#00FF00": colorRGB = [0,255,0];     break;
      case "#32CD32": colorRGB = [50,205,50];   break;
      case "#98FB98": colorRGB = [152,251,152]; break;
      case "#90EE90": colorRGB = [144,238,144]; break;
      case "#00FA9A": colorRGB = [0,250,154];   break;
      case "#00FF7F": colorRGB = [0,255,127];   break;
      case "#3CB371": colorRGB = [60,179,113];  break;
      case "#2E8B57": colorRGB = [46,139,87];   break;
      case "#228B22": colorRGB = [34,139,34];   break;
      case "#008000": colorRGB = [0,128,0];     break;
      case "#006400": colorRGB = [0,100,0];     break;
      case "#9ACD32": colorRGB = [154,205,50];  break;
      case "#6B8E23": colorRGB = [107,142,35];  break;
      case "#808000": colorRGB = [128,128,0];   break;
      case "#556B2F": colorRGB = [85,107,47];   break;
      case "#66CDAA": colorRGB = [102,205,170]; break;
      case "#8FBC8F": colorRGB = [143,188,143]; break;
      case "#20B2AA": colorRGB = [32,178,170];  break;
      case "#008B8B": colorRGB = [0,139,139];   break;
      case "#008080": colorRGB = [0,128,128];   break;
      case "#00FFFF": colorRGB = [0,255,255];   break;
      case "#E0FFFF": colorRGB = [224,255,255]; break;
      case "#AFEEEE": colorRGB = [175,238,238]; break;
      case "#7FFFD4": colorRGB = [127,255,212]; break;
      case "#40E0D0": colorRGB = [64,224,208];  break;
      case "#48D1CC": colorRGB = [72,209,204];  break;
      case "#00CED1": colorRGB = [0,206,209];   break;
      case "#5F9EA0": colorRGB = [95,158,160];  break;
      case "#4682B4": colorRGB = [70,130,180];  break;
      case "#B0C4DE": colorRGB = [176,196,222]; break;
      case "#B0E0E6": colorRGB = [176,224,230]; break;
      case "#ADD8E6": colorRGB = [173,216,230]; break;
      case "#87CEEB": colorRGB = [135,206,235]; break;
      case "#87CEFA": colorRGB = [135,206,250]; break;
      case "#00BFFF": colorRGB = [0,191,255];   break;
      case "#1E90FF": colorRGB = [30,144,255];  break;
      case "#6495ED": colorRGB = [100,149,237]; break;
      case "#7B68EE": colorRGB = [123,104,238]; break;
      case "#4169E1": colorRGB = [65,105,225];  break;
      case "#0000FF": colorRGB = [0,0,255];     break;
      case "#0000CD": colorRGB = [0,0,205];     break;
      case "#00008B": colorRGB = [0,0,139];     break;
      case "#000080": colorRGB = [0,0,128];     break;
      case "#191970": colorRGB = [25,25,112];   break;
      case "#FFF8DC": colorRGB = [255,248,220]; break;
      case "#FFEBCD": colorRGB = [255,235,205]; break;
      case "#FFE4C4": colorRGB = [255,228,196]; break;
      case "#FFDEAD": colorRGB = [255,222,173]; break;
      case "#F5DEB3": colorRGB = [245,222,179]; break;
      case "#DEB887": colorRGB = [222,184,135]; break;
      case "#D2B48C": colorRGB = [210,180,140]; break;
      case "#BC8F8F": colorRGB = [188,143,143]; break;
      case "#F4A460": colorRGB = [244,164,96];  break;
      case "#DAA520": colorRGB = [218,165,32];  break;
      case "#B8860B": colorRGB = [184,134,11];  break;
      case "#CD853F": colorRGB = [205,133,63];  break;
      case "#D2691E": colorRGB = [210,105,30];  break;
      case "#8B4513": colorRGB = [139,69,19];   break;
      case "#A0522D": colorRGB = [160,82,45];   break;
      case "#A52A2A": colorRGB = [165,42,42];   break;
      case "#800000": colorRGB = [128,0,0];     break;
      case "#FFFFFF": colorRGB = [255,255,255]; break;
      case "#FFFAFA": colorRGB = [255,250,250]; break;
      case "#F0FFF0": colorRGB = [240,255,240]; break;
      case "#F5FFFA": colorRGB = [245,255,250]; break;
      case "#F0FFFF": colorRGB = [240,255,255]; break;
      case "#F0F8FF": colorRGB = [240,248,255]; break;
      case "#F8F8FF": colorRGB = [248,248,255]; break;
      case "#F5F5F5": colorRGB = [245,245,245]; break;
      case "#FFF5EE": colorRGB = [255,245,238]; break;
      case "#F5F5DC": colorRGB = [245,245,220]; break;
      case "#FDF5E6": colorRGB = [253,245,230]; break;
      case "#FFFAF0": colorRGB = [255,250,240]; break;
      case "#FFFFF0": colorRGB = [255,255,240]; break;
      case "#FAEBD7": colorRGB = [250,235,215]; break;
      case "#FAF0E6": colorRGB = [250,240,230]; break;
      case "#FFF0F5": colorRGB = [255,240,245]; break;
      case "#FFE4E1": colorRGB = [255,228,225]; break;
      case "#DCDCDC": colorRGB = [220,220,220]; break;
      case "#D3D3D3": colorRGB = [211,211,211]; break;
      case "#C0C0C0": colorRGB = [192,192,192]; break;
      case "#A9A9A9": colorRGB = [169,169,169]; break;
      case "#808080": colorRGB = [128,128,128]; break;
      case "#696969": colorRGB = [105,105,105]; break;
      case "#778899": colorRGB = [119,136,153]; break;
      case "#708090": colorRGB = [112,128,144]; break;
      case "#2F4F4F": colorRGB = [47,79,79];    break;
      case "#000000": colorRGB = [0,0,0];       break;   
   }
   return colorRGB;      
}
