var vuosien_asettelu;
var metatiedot = new Array();
var luvut=new Array();
var vaihtoehdot_haettu=1;
var palautus=new Array();
var tyolliset;
var tyottomia;
var vuodet;
var ladataan_metat=0;

function metat() {

var url = "http://pxnet2.stat.fi/PXWeb/api/v1/fi/Postinumeroalueittainen_avoin_tieto/2015/paavo_9_koko_2015.px";
var xmlhttp = new XMLHttpRequest();
metatiedot = new Array();
xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	metatiedot=JSON.parse(xmlhttp.responseText);
    //document.getElementById("testipalikka").innerHTML =metatiedot.variables[0].values[0];
	
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

}


function postinro_kysely(e) {
	if (e.keyCode == '13') {
	numero=document.getElementById("postinumero_input").value;
	hae(numero);
	
	}
}	
	
function hae_pno(pno_jarj) {
	document.getElementById("postinumeron_selite").innerHTML="Postinumero: "+metatiedot.variables[0].values[pno_jarj] + ". ID-nro SVG-tiedostossa: "+pno_jarj ;
	//alert(pno_jarj);
	
	
}


function hae(postinro)  {
	
xmlhttp = new XMLHttpRequest();
var url = "http://pxnet2.stat.fi/PXWeb/api/v1/fi/Postinumeroalueittainen_avoin_tieto/2015/paavo_9_koko_2015.px";
xmlhttp.open("POST", url,true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
xmlhttp.onreadystatechange = function () {	
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
var arr = JSON.parse(xmlhttp.responseText);
arr=arr.data;
document.getElementById("testipalikka").innerHTML ="Väkiluku ("+postinro+"):"+arr[0].values+"<br>Keski-ikä: "+arr[1].values;
}
}

var parameters = JSON.stringify(
{
"query": [
{"code": "Postinumeroalue", "selection": { "filter": "item","values":[postinro]}},
{"code": "Tiedot", "selection": { "filter": "item","values":  ["He_vakiy","He_kika"]  }}],
"response": { "format": "json" }}
);

xmlhttp.send(parameters);

}

