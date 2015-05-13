// ***********************************************************************************************
// *************************         Funciones:           ****************************************
// ************************* rellenaSelectColor(selectid) ****************************************
// *************************        selectColor()         ****************************************
// ***********************************************************************************************
//
// Descripción: 
//    Funciones que rellenan los selectores de colores con los valores 
//    de la lista global "colores"            
// Llamadas por: 
//    función load()
// Invocan a:
//    nada
// Variables globales:
//    - colores

// *************** Variable global ******************

var colores = [
   ["#CD5C5C","white","IndianRed"],
   ["#F08080","black","LightCoral"],
   ["#FA8072","black","Salmon"],
   ["#E9967A","black","DarkSalmon"],
   ["#FFA07A","black","LightSalmon"],
   ["#DC143C","white","Crimson"],
   ["#FF0000","white","Red"],
   ["#B22222","white","FireBrick"],
   ["#8B0000","white","DarkRed"],
   ["#FFC0CB","black","Pink"],
   ["#FFB6C1","black","LightPink"],
   ["#FF69B4","white","HotPink"],
   ["#FF1493","white","DeepPink"],
   ["#C71585","white","MediumVioletRed"],
   ["#DB7093","white","PaleVioletRed"],
   ["#FFA07A","black","LightSalmon"],
   ["#FF7F50","white","Coral"],
   ["#FF6347","white","Tomato"],
   ["#FF4500","white","OrangeRed"],
   ["#FF8C00","white","DarkOrange"],
   ["#FFA500","white","Orange"],
   ["#FFD700","black","Gold"],
   ["#FFFF00","black","Yellow"],
   ["#FFFFE0","black","LightYellow"],
   ["#FFFACD","black","LemonChiffon"],
   ["#FAFAD2","black","LightGoldenrodYellow"],
   ["#FFEFD5","black","PapayaWhip"],
   ["#FFE4B5","black","Moccasin"],
   ["#FFDAB9","black","PeachPuff"],
   ["#EEE8AA","black","PaleGoldenrod"],
   ["#F0E68C","black","Khaki"],
   ["#BDB76B","white","DarkKhaki"],
   ["#E6E6FA","black","Lavender"],
   ["#D8BFD8","white","Thistle"],
   ["#DDA0DD","white","Plum"],
   ["#EE82EE","white","Violet"],
   ["#DA70D6","white","Orchid"],
   ["#FF00FF","white","Fuchsia / Magenta"],
   ["#BA55D3","white","MediumOrchid"],
   ["#9370DB","white","MediumPurple"],
   ["#8A2BE2","white","BlueViolet"],
   ["#9400D3","white","DarkViolet"],
   ["#9932CC","white","DarkOrchid"],
   ["#8B008B","white","DarkMagenta"],
   ["#800080","white","Purple"],
   ["#4B0082","white","Indigo"],
   ["#6A5ACD","white","SlateBlue"],
   ["#483D8B","white","DarkSlateBlue"],
   ["#ADFF2F","black","GreenYellow"],
   ["#7FFF00","black","Chartreuse"],
   ["#7CFC00","black","LawnGreen"],
   ["#00FF00","black","Lime"],
   ["#32CD32","black","LimeGreen"],
   ["#98FB98","black","PaleGreen"],
   ["#90EE90","black","LightGreen"],
   ["#00FA9A","black","MediumSpringGreen"],
   ["#00FF7F","black","SpringGreen"],
   ["#3CB371","white","MediumSeaGreen"],
   ["#2E8B57","white","SeaGreen"],
   ["#228B22","white","ForestGreen"],
   ["#008000","white","Green"],
   ["#006400","white","DarkGreen"],
   ["#9ACD32","white","YellowGreen"],
   ["#6B8E23","white","OliveDrab"],
   ["#808000","white","Olive"],
   ["#556B2F","white","DarkOliveGreen"],
   ["#66CDAA","black","MediumAquamarine"],
   ["#8FBC8F","white","DarkSeaGreen"],
   ["#20B2AA","white","LightSeaGreen"],
   ["#008B8B","white","DarkCyan"],
   ["#008080","white","Teal"],
   ["#00FFFF","black","Aqua/Cyan"],
   ["#E0FFFF","black","LightCyan"],
   ["#AFEEEE","black","PaleTurquoise"],
   ["#7FFFD4","black","Aquamarine"],
   ["#40E0D0","black","Turquoise"],
   ["#48D1CC","white","MediumTurquoise"],
   ["#00CED1","white","DarkTurquoise"],
   ["#5F9EA0","white","CadetBlue"],
   ["#4682B4","white","SteelBlue"],
   ["#B0C4DE","black","LightSteelBlue"],
   ["#B0E0E6","black","PowderBlue"],
   ["#ADD8E6","black","LightBlue"],
   ["#87CEEB","black","SkyBlue"],
   ["#87CEFA","black","LightSkyBlue"],
   ["#00BFFF","white","DeepSkyBlue"],
   ["#1E90FF","white","DodgerBlue"],
   ["#6495ED","white","CornflowerBlue"],
   ["#7B68EE","white","MediumSlateBlue"],
   ["#4169E1","white","RoyalBlue"],
   ["#0000FF","white","Blue"],
   ["#0000CD","white","MediumBlue"],
   ["#00008B","white","DarkBlue"],
   ["#000080","white","Navy"],
   ["#191970","white","MidnightBlue"],
   ["#FFF8DC","black","Cornsilk"],
   ["#FFEBCD","black","BlanchedAlmond"],
   ["#FFE4C4","black","Bisque"],
   ["#FFDEAD","black","NavajoWhite"],
   ["#F5DEB3","black","Wheat"],
   ["#DEB887","white","BurlyWood"],
   ["#D2B48C","white","Tan"],
   ["#BC8F8F","white","RosyBrown"],
   ["#F4A460","white","SandyBrown"],
   ["#DAA520","white","Goldenrod"],
   ["#B8860B","white","DarkGoldenrod"],
   ["#CD853F","white","Peru"],
   ["#D2691E","white","Chocolate"],
   ["#8B4513","white","SaddleBrown"],
   ["#A0522D","white","Sienna"],
   ["#A52A2A","white","Brown"],
   ["#800000","white","Maroon"],
   ["#FFFFFF","black","White"],
   ["#FFFAFA","black","Snow"],
   ["#F0FFF0","black","Honeydew"],
   ["#F5FFFA","black","MintCream"],
   ["#F0FFFF","black","Azure"],
   ["#F0F8FF","black","AliceBlue"],
   ["#F8F8FF","black","GhostWhite"],
   ["#F5F5F5","black","WhiteSmoke"],
   ["#FFF5EE","black","Seashell"],
   ["#F5F5DC","black","Beige"],
   ["#FDF5E6","black","OldLace"],
   ["#FFFAF0","black","FloralWhite"],
   ["#FFFFF0","black","Ivory"],
   ["#FAEBD7","black","AntiqueWhite"],
   ["#FAF0E6","black","Linen"],
   ["#FFF0F5","black","LavenderBlush"],
   ["#FFE4E1","black","MistyRose"],
   ["#DCDCDC","black","Gainsboro"],
   ["#D3D3D3","black","LightGrey"],
   ["#C0C0C0","black","Silver"],
   ["#A9A9A9","black","DarkGray"],
   ["#808080","white","Gray"],
   ["#696969","white","DimGray"],
   ["#778899","white","LightSlateGray"],
   ["#708090","white","SlateGray"],
   ["#2F4F4F","white","DarkSlateGray"],
   ["#000000","white","Black"]
]

      
// ************** Funciones ****************

function rellenaSelectColor(selectid){
   selectid.options.length = 0;
   for (var i=0; i<colores.length; i++) {
      selectid.options[i] = new Option(""+colores[i][2]+"",""+colores[i][0]+"");
      selectid.options[i].style.background = colores[i][0];
      selectid.options[i].style.color = colores[i][1];
   }
}

function selectColor() {
   rellenaSelectColor(document.getElementById("color1"));
   rellenaSelectColor(document.getElementById("color2"));
   rellenaSelectColor(document.getElementById("colorIndividual"));
   rellenaSelectColor(document.getElementById("colorLimPrq"));
   rellenaSelectColor(document.getElementById("colorLimArcip"));
   rellenaSelectColor(document.getElementById("colorLimVic"));
   rellenaSelectColor(document.getElementById("colorLimComarc"));
   rellenaSelectColor(document.getElementById("colorSitu1"));
   rellenaSelectColor(document.getElementById("colorSitu2"));
   rellenaSelectColor(document.getElementById("colorSitu3"));
   rellenaSelectColor(document.getElementById("colorSitu4"));
   rellenaSelectColor(document.getElementById("colorSitu5"));
   rellenaSelectColor(document.getElementById("colorSitu6"));
   rellenaSelectColor(document.getElementById("colorSitu7"));
   rellenaSelectColor(document.getElementById("colorSitu8"));
   rellenaSelectColor(document.getElementById("colorSitu9"));
   rellenaSelectColor(document.getElementById("colorSitu10"));
}
