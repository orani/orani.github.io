
var vaihtoehdot_haettu=0;


function vuosirajaus(valittuvuosi)
{
	document.getElementById("valittuvuosi").innerHTML=valittuvuosi;
}


Array.prototype.toLowerCase = function() {
    var i = this.length;
    while ( --i >= 0 ) {
        if ( typeof this[i] === "string" ) {
            this[i] = this[i].toLowerCase();
        }
    }
    return this;
};
Array.prototype.parsi = function() {
	var arr = this;
    for (i=0; i<this.length;i++) {
		str=arr[i];
		 if (str.search(" ")>-1) {     arr[i] = str.substring(0,str.search(" ")); } 
	}
	
}


function vaihtoehdot() {


	for (muuttuja=0;muuttuja<metatiedot.variables.length;muuttuja++)  {
	if (metatiedot.variables[muuttuja].code=="Alue") {
		kuntanimikkeet=metatiedot.variables[muuttuja].valueTexts;
		kuntakoodit=metatiedot.variables[muuttuja].values;
		 }
	} 
	kuntanimikkeet.parsi();
	var sisalto;
	for (muuttuja=0; muuttuja<kuntakoodit.length; muuttuja++) {
	    sisalto+="<option value="+kuntanimikkeet[muuttuja]+"></option>";
		sisalto+="<option value="+kuntakoodit[muuttuja]+"></option>";
		
	
	   
	}
	document.getElementById("kuntaKooditNimet").innerHTML=sisalto;
	
alert('vaihtoehdot ok');	
	
}


function metat() {

var url = "http://pxnet2.stat.fi/PXWeb/api/v1/fi/StatFin/vrm/tyokay/010_tyokay_tau_101.px";
var xmlhttp = new XMLHttpRequest();
metatiedot = new Array();
xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	metatiedot=JSON.parse(xmlhttp.responseText);
 
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

alert('metat ok');
}
