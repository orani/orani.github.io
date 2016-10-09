	

function haetaulukko() {
	
	kohde="taulukkodata";
	
	var kuntakoodi=document.getElementById("taulukoitavakuntakoodi").innerHTML;
	//if (kokomaa==1) { kuntakoodi='SSS'; kohde="taulukkodata_kokomaa" }
	document.getElementById(kohde).innerHTML="";
	var ekavuosi = parseInt(document.getElementById("vuosi_min").value);
	var vikavuosi = parseInt(document.getElementById("vuosi_max").value);
	vuodet = new Array();
	var vuosi = ekavuosi;
	var erotus = vikavuosi-ekavuosi;
	for (i=0;i<=erotus;i++) { 	vuodet[i]=vuosi;	vuosi=vuosi+1;   }
	
	
	/* Sliderin raja-arvot datan pohjalta 
	
	document.getElementById("vuosirajaus").max=vikavuosi;
	document.getElementById("vuosirajaus").min=ekavuosi;
	document.getElementById("vuosirajaus").value=ekavuosi;
	document.getElementById("valittuvuosi").innerHTML=document.getElementById("vuosirajaus").value;
	*/
	xmlhttp_aikasarja = new XMLHttpRequest();
	var url = "http://pxnet2.stat.fi/PXWeb/api/v1/fi/StatFin/vrm/tyokay/010_tyokay_tau_101.px";
	xmlhttp_aikasarja.open("POST", url,true);
	xmlhttp_aikasarja.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp_aikasarja.onreadystatechange = function () {	
		if (xmlhttp_aikasarja.readyState == 4 && xmlhttp_aikasarja.status == 200) {
		//	alert('Luvut saatu');
			var arr = JSON.parse(xmlhttp_aikasarja.responseText);
			arr=arr.data;
			luvut = new Array();
			for (i=0;i<arr.length;i++) {		luvut[i]=arr[i].values;		}
			rivi=0;
			ptoim=0;
			ika=0;
			
			document.getElementById(kohde).innerHTML=document.getElementById(kohde).innerHTML+
			ptoim_koodit[ptoim]+";"+
			ika_koodit[ika]+
			";";
			
			++ika;
			
			ptoim_ika_luokkia=ptoim_koodit.length*ika_koodit.length;
			
			for (i=0;i<(vuodet.length*ptoim_ika_luokkia);i++) {
			
			if (rivi==vuodet.length) { rivi=0; 
			document.getElementById(kohde).innerHTML=document.getElementById(kohde).innerHTML+":<br>"+ptoim_koodit[ptoim]+";"+
			ika_koodit[ika]+";";
			++ika;
			if (ika==ika_koodit.length) { ika=0; ++ptoim;; }
			if (ptoim==ptoim_koodit.length) { ptoim=0 }
			} 
			rivi=rivi+1;
			document.getElementById(kohde).innerHTML=document.getElementById(kohde).innerHTML+luvut[i]+","; 
 			}
		    document.getElementById(kohde).innerHTML=document.getElementById(kohde).innerHTML+";"; 
			}
		}
	
	ptoim_koodit = ["SS","11","12"];
	ika_koodit = ["SSS","0-17","18-64","65+"]

	var parameters = JSON.stringify(
	{
	"query": [
	{"code": "Alue", "selection": { "filter": "item","values": [ kuntakoodi ]}},
	{"code": "Vuosi", "selection": { "filter": "item","values": vuodet  }},
	{"code": "Pääasiallinen toiminta","selection": { "filter": "item","values": 
		ptoim_koodit
		}}
		,{"code": "Ikä", "selection": { "filter": "item","values": ika_koodit  }}
	],"response": { "format": "json" }}
	);
	
	xmlhttp_aikasarja.send(parameters);
	
	
	
}

function haekokomaa() {
	
	kohde="taulukkodata_kokomaa";
	
	var kuntakoodi='SSS'
	//if (kokomaa==1) { kuntakoodi='SSS'; kohde="taulukkodata_kokomaa" }
	document.getElementById(kohde).innerHTML="SSS";
	var ekavuosi = parseInt(document.getElementById("vuosi_min").value);
	var vikavuosi = parseInt(document.getElementById("vuosi_max").value);
	vuodet = new Array();
	var vuosi = ekavuosi;
	var erotus = vikavuosi-ekavuosi;
	for (i=0;i<=erotus;i++) { 	vuodet[i]=vuosi;	vuosi=vuosi+1;   }
	
	
	xmlhttp_kokomaa = new XMLHttpRequest();
	var url = "http://pxnet2.stat.fi/PXWeb/api/v1/fi/StatFin/vrm/tyokay/010_tyokay_tau_101.px";
	xmlhttp_kokomaa.open("POST", url,true);
	xmlhttp_kokomaa.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp_kokomaa.onreadystatechange = function () {	
		if (xmlhttp_kokomaa.readyState == 4 && xmlhttp_kokomaa.status == 200) {
		//	alert('Luvut saatu');
			var arr = JSON.parse(xmlhttp_kokomaa.responseText);
			arr=arr.data;
			luvut = new Array();
			for (i=0;i<arr.length;i++) {		luvut[i]=arr[i].values;		}
			rivi=0;
			ptoim=0;
			ika=0;
			
			document.getElementById(kohde).innerHTML=document.getElementById(kohde).innerHTML+
			ptoim_koodit[ptoim]+";"+
			ika_koodit[ika]+
			";";
			
			++ika;
			
			ptoim_ika_luokkia=ptoim_koodit.length*ika_koodit.length;
			
			for (i=0;i<(vuodet.length*ptoim_ika_luokkia);i++) {
			
			if (rivi==vuodet.length) { rivi=0; 
			document.getElementById(kohde).innerHTML=document.getElementById(kohde).innerHTML+":<br>"+ptoim_koodit[ptoim]+";"+
			ika_koodit[ika]+";";
			++ika;
			if (ika==ika_koodit.length) { ika=0; ++ptoim;; }
			if (ptoim==ptoim_koodit.length) { ptoim=0 }
			} 
			rivi=rivi+1;
			document.getElementById(kohde).innerHTML=document.getElementById(kohde).innerHTML+luvut[i]+","; 
 			}
		    document.getElementById(kohde).innerHTML=document.getElementById(kohde).innerHTML+";"; 
			}
		}
	
	ptoim_koodit = ["SS","11","12"];
	ika_koodit = ["SSS","0-17","18-64","65+"]

	var parameters = JSON.stringify(
	{
	"query": [
	{"code": "Alue", "selection": { "filter": "item","values": [ kuntakoodi ]}},
	{"code": "Vuosi", "selection": { "filter": "item","values": vuodet  }},
	{"code": "Pääasiallinen toiminta","selection": { "filter": "item","values": 
		ptoim_koodit
		}}
		,{"code": "Ikä", "selection": { "filter": "item","values": ika_koodit  }}
	],"response": { "format": "json" }}
	);
	
	xmlhttp_kokomaa.send(parameters);
	
	
}


function haeluku(poiminta,kokomaa) {
	
	if (kokomaa==0) { luvut=document.getElementById("taulukkodata").innerHTML.split(":"); }
	if (kokomaa==1) { luvut=document.getElementById("taulukkodata_kokomaa").innerHTML.split(":"); }
	
	for (i=0;i<luvut.length;++i) {		if (luvut[i].indexOf(poiminta)>-1) { palautus=luvut[i] }	}
	palautus=palautus.replace('<br>','');
	palautus=palautus.replace(poiminta,'')
	palautus=palautus.split(',');
	
	palautus.splice(palautus.length-1,1);
	
	return palautus;
	
	
}
