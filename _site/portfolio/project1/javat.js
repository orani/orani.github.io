

var postinumerolaatikoita=3;


function metat() {

var url = "http://pxnet2.stat.fi/PXWeb/api/v1/fi/Postinumeroalueittainen_avoin_tieto/2015/paavo_9_koko_2015.px";
var xmlhttp = new XMLHttpRequest();
metatiedot = new Array();
xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	metatiedot=JSON.parse(xmlhttp.responseText);
    //document.getElementById("testipalikka").innerHTML =metatiedot.variables[0].values[1]+" "+metatiedot.variables[0].valueTexts[1];
	postinumero_koodit=metatiedot.variables[0].values;
	postinumero_tekstit=metatiedot.variables[0].valueTexts;
	
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

}


function postinro_kysely_kaikki() {
	//for (input_nro = 1; input_nro <= postinumerolaatikoita; input_nro++) { 
   
	numero=document.getElementById("postinumero_input_1").value;
	hae(numero,1);
	hae_hintatiedot(numero,1);
	
	//setTimeout(hae(numero,input_nro),1100000);
	//}
}
function postinro_kysely(e,input_nro) {
	if (e.keyCode == '13') {
		 
	
		numero=document.getElementById("postinumero_input_"+input_nro).value;
		
		hae(numero,input_nro);
		hae_hintatiedot(numero,input_nro);
		
		sijainti=postinumero_koodit.indexOf(numero);
		document.getElementById("stat_"+input_nro+"_nimike").innerHTML ="<b>Postinumeroalue: </b>"+postinumero_tekstit[sijainti];	
		
	
	}
}	

function uusi_postinumerolaatikko() {
 //alert(document.getElementById("postinumerolaatikot").innerHTML);	
 laatikkonumero=postinumerolaatikoita+1;

 lisays= "<div class='plan'> <div class='title'>"+
 "<h4> <input id='postinumero_input_"+laatikkonumero+"' value='00500' onkeypress='postinro_kysely(event,"+laatikkonumero+");' onfocus='select();' size='5' type='text'></h4>"
+"</div><div class='content'><ul>"
+"<li id='stat_"+laatikkonumero+"_nimike'>...</li>"
+"<li id='stat_"+laatikkonumero+"_1'>...</li>"
+"<li id='stat_"+laatikkonumero+"_2'>...</li>"
+"<li id='stat_"+laatikkonumero+"_3'>...</li>"
+"<li id='stat_"+laatikkonumero+"_4'>...</li>"
+"<li id='stat_"+laatikkonumero+"_5'>...</li>"
+"<li id='stat_"+laatikkonumero+"_6'>...</li>"
+"<li id='stat_"+laatikkonumero+"_7'>...</li>"
+"<li id='stat_"+laatikkonumero+"_8'>...</li>"
+"<li id='stat_"+laatikkonumero+"_9'>...</li>"
+"</ul></div></div>";

postinumerolaatikoita=laatikkonumero;
document.getElementById("postinumerolaatikot").innerHTML=document.getElementById("postinumerolaatikot").innerHTML+lisays;

}
function hae_hintatiedot(postinumero,input_nro) {
	//alert("Aloitetaan hinta.."+input_nro+"  "+postinumero);
	
	document.getElementById("stat_"+input_nro+"_7").innerHTML ="Haetaan hintatietoja..";
	document.getElementById("stat_"+input_nro+"_8").innerHTML ="Haetaan hintatietoja..";
	document.getElementById("stat_"+input_nro+"_9").innerHTML ="Haetaan hintatietoja..";
	
xmlhttp2 = new XMLHttpRequest();
var url = "http://pxnet2.stat.fi/PXWeb/api/v1/en/StatFin/asu/ashi/040_ashi_tau_104.px";
xmlhttp2.open("POST", url,true);
xmlhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
xmlhttp2.onreadystatechange = function () {	
if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
	var arr = JSON.parse(xmlhttp2.responseText);
	
	arr=arr.data;
	document.getElementById("stat_"+input_nro+"_7").innerHTML ="<b>Asuntojen keskihinta:</b> "+arr[2].values+" €/m²"+" ("+arr[3].values+" kauppaa)";
	document.getElementById("stat_"+input_nro+"_8").innerHTML ="<b>Kerrostalojen keskihinta:</b> "+arr[0].values+ "€/m²"+" ("+arr[1].values+" kauppaa)";
	document.getElementById("stat_"+input_nro+"_9").innerHTML ="<b>Rivitalojen keskihinta:</b> "+arr[4].values+" €/m²"+" ("+arr[5].values+" kauppaa)";
	

	
}


}

var parameters = JSON.stringify(
{
"query": [
{"code": "Vuosi", "selection": { "filter": "item","values":["2015"]}},
{"code": "Neljännes", "selection": { "filter": "item","values":  ["0"] }},
{"code": "Talotyyppi", "selection": { "filter": "item","values":  [
"4", // Kerrostalot
"6", // Yhteensä
"5"  // Rivitalot
] }},
{"code": "Postinumero", "selection": { "filter": "item","values":  [postinumero] 
}}],
"response": { "format": "json" }}
);

xmlhttp2.send(parameters);


}


function hae(postinro,input_nro)  {

		
xmlhttp = new XMLHttpRequest();
var url = "http://pxnet2.stat.fi/PXWeb/api/v1/fi/Postinumeroalueittainen_avoin_tieto/2015/paavo_9_koko_2015.px";
xmlhttp.open("POST", url,true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
xmlhttp.onreadystatechange = function () {	
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
var arr = JSON.parse(xmlhttp.responseText);
arr=arr.data;
//document.getElementById("postinumeron_selite_"+input_nro).innerHTML ="Väkiluku ("+postinro+"):"+arr[0].values+"<br>Keski-ikä: "+arr[1].values;
	//if (input_nro=='1') {	document.getElementById("postinumeron_selite_1").innerHTML ="Väkiluku ("+postinro+"):"+arr[0].values+"<br>Keski-ikä: "+arr[1].values;	}
	//if (input_nro=='2') {	document.getElementById("postinumeron_selite_2").innerHTML ="Väkiluku ("+postinro+"):"+arr[0].values+"<br>Keski-ikä: "+arr[1].values;	}
	//if (input_nro=='3') {	
	document.getElementById("stat_"+input_nro+"_1").innerHTML ="<b>Väkiluku:</b> "+arr[0].values;
	document.getElementById("stat_"+input_nro+"_2").innerHTML ="<b>Keski-ikä:</b> "+arr[1].values;
	document.getElementById("stat_"+input_nro+"_3").innerHTML ="<b>Keski- ja mediaanitulo:</b> "+arr[2].values +" €, "+arr[3].values+" €";
	document.getElementById("stat_"+input_nro+"_4").innerHTML ="<b>Työttömiä:</b> "+arr[8].values+" ("+Math.round((arr[8].values/arr[7].values)*1000,2)/10+" % työvoimasta)";
	document.getElementById("stat_"+input_nro+"_5").innerHTML ="<b>Talouksista vuokralla:</b> "+Math.round((arr[6].values/arr[4].values)*1000,2)/10+" %";
	document.getElementById("stat_"+input_nro+"_6").innerHTML ="<b>Talouksista lapsitalouksia:</b> "+Math.round((arr[5].values/arr[4].values)*1000,2)/10+" %";
	//} Math.round((arr[5].values/arr[4].values)*100,2)
	
}


}



var parameters = JSON.stringify(
{
"query": [
{"code": "Postinumeroalue", "selection": { "filter": "item","values":[postinro]}},
{"code": "Tiedot", "selection": { "filter": "item","values":  [
"He_vakiy",	// 0
"He_kika",	// 1
"Hr_mtu",	// 2
"Hr_ktu",	// 3
"Te_taly",	// 4
"Te_laps",	// 5
"Te_vuok_as",	// 6
"Pt_tyovy", 	// 7
"Pt_tyott"	// 8
] }}],
"response": { "format": "json" }}
);

xmlhttp.send(parameters);

}

