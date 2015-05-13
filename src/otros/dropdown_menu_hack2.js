function foo(px,py,pw,ph,baseElement,ddfid)
{
var ddwin = document.getElementById(this.ddfid);
}


function dropdown_menu_hack(el)
{
//if(el.runtimeStyle.behavior.toLowerCase()=="none"){return;}
el.runtimeStyle.behavior="none";

var ddie5 = (document.namespaces==null);
el.ondblclick = function(e)
{
window.event.returnValue=false;
return false;
}

if(window.createPopup==null)
{

var ddfid = "dropdown_menu_hack_" + Date.parse(new Date());

window.createPopup = function()
{
if(window.createPopup.frameWindow==null)
{
el.insertAdjacentHTML("AfterEnd","<iframe id='"+ddfid+"' name='"+ddfid+"' src='about:blank' frameborder='1' scrolling='no'></></iframe>");
var ddf = document.frames[ddfid];
ddf.document.open();
ddf.document.write("<html><body></body></html>");
ddf.document.close();
ddf.ddfid = ddfid;


var ddfwin = document.getElementById(ddfid);
ddfwin.style.cssText="position:absolute;top:0;left:0;display:none;z-index:99999;";


ddf.show = function(px,py,pw,ph,baseElement)
{
py = py + baseElement.getBoundingClientRect().top + Math.max( document.body.scrollTop, document.documentElement.scrollTop) ;
px = px + baseElement.getBoundingClientRect().left + Math.max( document.body.scrollLeft, document.documentElement.scrollLeft) ;
ddfwin.style.width = pw + "px";
ddfwin.style.height = ph + "px";
ddfwin.style.posLeft =px ;
ddfwin.style.posTop = py ;
ddfwin.style.display="block";
}


f_hide = function(e)
{
if(window.event && window.event.srcElement && window.event.srcElement.tagName && window.event.srcElement.tagName.toLowerCase()=="select"){return true;}
ddfwin.style.display="none";
}
ddf.hide = f_hide;
document.attachEvent("onclick",f_hide);
document.attachEvent("onkeydown",f_hide);

}
return f;
}
}

function showMenu()
{

function selectMenu(obj)
{
var ddo = document.createElement("option");
ddo.value = obj.value;
ddo.innerHTML = obj.innerHTML;
while(el.options.length>0){el.options[0].removeNode(true);}
el.appendChild(ddo);
el.title = ddo.innerHTML;
el.contentIndex = obj.selectedIndex ;
el.menu.hide();
}


el.menu.show(0 , el.offsetHeight , 10, 10, el);
var ddmb = el.menu.document.body;

ddmb.style.cssText ="border:solid 1px black;margin:0;padding:0;overflow-y:auto;overflow-x:auto;background:white;text-aligbn:center;font-family:Verdana;font-size:12px;";
var ddt = el.contentHTML;
ddt = ddt.replace(/<select/gi,'<ul');
ddt = ddt.replace(/<option/gi,'<li');
ddt = ddt.replace(/<\/option/gi,'</li');
ddt = ddt.replace(/<\/select/gi,'</ul');
ddmb.innerHTML = ddt;


el.select = ddmb.all.tags("ul")[0];
el.select.style.cssText="list-style:none;margin:0;padding:0;";
ddmb.options = el.select.getElementsByTagName("li");

for(var i=0;i<ddmb.options.length;i++)
{
ddmb.options[i].selectedIndex = i;
ddmb.options[i].style.cssText = "list-style:none;margin:0;padding:1px 2px;width/**/:100%;cursor:hand;cursor:pointer;white-space:nowrap;"
ddmb.options[i].title =ddmb.options[i].innerHTML;
ddmb.options[i].innerHTML ="<nobr>" + ddmb.options[i].innerHTML + "</nobr>";
ddmb.options[i].onmouseover = function()
{
if( ddmb.options.selected ){ddmb.options.selected.style.background="white";ddmb.options.selected.style.color="black";}
ddmb.options.selected = this;
this.style.background="#333366";this.style.color="white";
}

ddmb.options[i].onmouseout = function(){this.style.background="white";this.style.color="black";}
ddmb.options[i].onmousedown = function(){selectMenu(this); }
ddmb.options[i].onkeydown = function(){selectMenu(this); }


if(i == el.contentIndex)
{
ddmb.options[i].style.background="#333366";
ddmb.options[i].style.color="white";
ddmb.options.selected = ddmb.options[i];
}
}


var ddmw = Math.max( ( el.select.offsetWidth + 22 ), el.offsetWidth + 22 );
ddmw = Math.max( ddmw, ( ddmb.scrollWidth+22) );
var ddmh = ddmb.options.length * 15 + 8 ;

var ddmx = (ddie5)?-3:0;
var ddmy = el.offsetHeight -2;
var dddocH = document.documentElement.offsetHeight ;
var ddbottomH = dddocH - el.getBoundingClientRect().bottom ;

ddmh = Math.min(ddmh, Math.max(( dddocH - el.getBoundingClientRect().top - 50),100) );

if(( ddbottomH < ddmh) )
{

ddmh = Math.max( (ddbottomH - 12),10);
if( ddmh <100 )
{
ddmy = -100 ;

}
ddmh = Math.max(ddmh,100);
}


self.focus();

el.menu.show( ddmx , ddmy , ddmw, ddmh , el);
sync=null;
if(ddmb.options.selected)
{
ddmb.scrollTop = ddmb.options.selected.offsetTop;
}




window.onresize = function(){el.menu.hide()};
}

function switchMenu()
{
if(event.keyCode)
{
if(event.keyCode==40){ el.contentIndex++ ;}
else if(event.keyCode==38){ el.contentIndex--; }
}
else if(event.wheelDelta )
{
if (event.wheelDelta >= 120)
el.contentIndex++ ;
else if (event.wheelDelta <= -120)
el.contentIndex-- ;
}else{return true;}




if( el.contentIndex > (el.contentOptions.length-1) ){ el.contentIndex =0;}
else if (el.contentIndex<0){el.contentIndex = el.contentOptions.length-1 ;}

var ddo = document.createElement("option");
ddo.value = el.contentOptions[el.contentIndex].value;
ddo.innerHTML = el.contentOptions[el.contentIndex].text;
while(el.options.length>0){el.options[0].removeNode(true);}
el.appendChild(ddo);
el.title = ddo.innerHTML;
}

if(dropdown_menu_hack.menu ==null)
{
dropdown_menu_hack.menu = window.createPopup();
document.attachEvent("onkeydown",dropdown_menu_hack.menu.hide);
}
el.menu = dropdown_menu_hack.menu ;
el.contentOptions = new Array();
el.contentIndex = el.selectedIndex;
el.contentHTML = el.outerHTML;

for(var i=0;i<el.options.length;i++)
{
el.contentOptions [el.contentOptions.length] =
{
"value": el.options[i].value,
"text": el.options[i].innerHTML
}

if(!el.options[i].selected){el.options[i].removeNode(true);i--;};
}


el.onkeydown = switchMenu;
el.onclick = showMenu;
el.onmousewheel= switchMenu;

}
