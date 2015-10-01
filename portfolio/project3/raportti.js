
function raportti_alustus(e) {
	raportointi=0;
	if (e=="nappulasta") { raportointi=1;  }
	if (e.keyCode == '13' ) { raportointi=1;  }
	
	
	if (raportointi==1) {
	
	var muuttuja=0;
	var sijainti=0;
	var kuntakoodi=document.getElementById("kuntakysely").value;	
	if (kuntakoodi.length==3) {	sijainti=metatiedot.variables[muuttuja].values.indexOf(kuntakoodi); }
	if (kuntakoodi.length>3) {	sijainti=kuntanimikkeet.indexOf(kuntakoodi);		kuntakoodi=metatiedot.variables[muuttuja].values[sijainti];		 }
	kuntanimi=metatiedot.variables[muuttuja].valueTexts[sijainti];
	document.getElementById("otsikko").innerHTML=kuntanimi;
	document.getElementById("taulukoitavakuntakoodi").innerHTML=kuntakoodi;
	
	haetaulukko(1); 
	
	haetaulukko(0);
	
	}
	
	
}

function raportti() {
	
	vakiluku=haeluku('SS;SSS;');
	tyollisiaTyoikaisia=haeluku('11;18-64;');
	tyottomiaTyoikaisia=haeluku('12;18-64;');
	tyollisia=haeluku('11;SSS;');
	tyottomia=haeluku('12;SSS;');
	tyoikaisia=haeluku('SS;18-64;');
	alaikaisia=haeluku('SS;0-17;');
	elakeikaisia=haeluku('SS;65+;');
	
	var ekavuosi = parseInt(document.getElementById("vuosi_min").value);
	var vikavuosi = parseInt(document.getElementById("vuosi_max").value);

	vuodet = new Array();
	tal_huoltosuhde = new Array();
	vae_huoltosuhde = new Array();
	
	var vuosi = ekavuosi;
	var erotus = vikavuosi-ekavuosi;
	for (i=0;i<=erotus;i++) { 	vuodet[i]=vuosi;	vuosi=vuosi+1;

	tal_huoltosuhde[i]=(vakiluku[i]-tyollisia[i])/tyollisia[i]*100;
	
	vae_huoltosuhde[i]=(vakiluku[i]-tyoikaisia[i])/tyoikaisia[i]*100;
	
	}
	
	document.getElementById("kpl_1").innerHTML="Vuonna "+vikavuosi+" kunnassa oli "+vakiluku[vuodet.length-1]+" henkilöä, joista "+alaikaisia[vuodet.length-1]+" oli alaikäisiä";
	
	var vaestokuvaData = new Array();	
	vaestokuvaData[0] = vuodet;
	vaestokuvaData[1] = tyoikaisia;
	vaestokuvaData[2] = elakeikaisia;
	vaestokuvaData[3] = alaikaisia;
	
	var tyollisyyskuvaData = new Array();
	tyollisyyskuvaData[0] = vuodet;
	tyollisyyskuvaData[1] = tyollisiaTyoikaisia;
	tyollisyyskuvaData[2] = tyottomiaTyoikaisia;

	
	var huoltosuhdeData = new Array();
	huoltosuhdeData[0] = vuodet;
	huoltosuhdeData[1] = vae_huoltosuhde;
	huoltosuhdeData[2] = tal_huoltosuhde;

	
	if (document.getElementById("vaestotietokuva_tyyppi_P").checked ) { tyyppi="P"; }
	if (document.getElementById("vaestotietokuva_tyyppi_N").checked ) { tyyppi="N"; }
	if (document.getElementById("vaestotietokuva_tyyppi_NP").checked ) { tyyppi="NP"; }
	if (document.getElementById("vaestotietokuva_tyyppi_0").checked ) { tyyppi="0"; }
		
	piirra(vaestokuvaData,['Vuosi','Työikäisiä','Eläkeikäisiä','Alaikäisiä'],"Väestönkehitys",'vaestotietokuva',tyyppi);

	if (document.getElementById("tyollisyyskuva_tyyppi_P").checked ) { tyyppi="P"; }
	if (document.getElementById("tyollisyyskuva_tyyppi_N").checked ) { tyyppi="N"; }
	//if (document.getElementById("tyollisyyskuva_tyyppi_NP").checked ) { tyyppi="NP"; }
	if (document.getElementById("tyollisyyskuva_tyyppi_0").checked ) { tyyppi="0"; }

	piirra(tyollisyyskuvaData,['Vuosi','Työllisiä (18-64)',"Työttömiä (18-64)"],"Työllisyyden kehitys",'tyollisyyskuva',tyyppi);
   
	if (document.getElementById("huoltosuhdekuva_tyyppi_N").checked ) { tyyppi="N"; }
	if (document.getElementById("huoltosuhdekuva_tyyppi_0").checked ) { tyyppi="0"; }

   piirra(huoltosuhdeData,['Vuosi','Väestöllinen huoltosuhde','Taloudellinen huoltosuhde'],"Huoltosuhteiden kehitys",'huoltosuhdekuva',tyyppi);
   
	
	/*
	// Onko koko maan tt-aste suurempi vai pienempi
	tt_vertailu="yhtä suuri";
	if (Math.round(luvut_3[8]/(parseInt(luvut_3[4])+parseInt(luvut_3[8]))*100)>Math.round(luvut_1[8]/(parseInt(luvut_1[4])+parseInt(luvut_1[8]))*100)) { tt_vertailu="suurempi"	}
	if (Math.round(luvut_3[8]/(parseInt(luvut_3[4])+parseInt(luvut_3[8]))*100)<Math.round(luvut_1[8]/(parseInt(luvut_1[4])+parseInt(luvut_1[8]))*100)) { tt_vertailu="pienempi"	}
	
	// Onko väestö kasvanut vai vähentynyt ko. ajanjaksolla
	
	aikavertailu_vakiluku="kasvanut";
	if ((luvut_2[1]-luvut_2[0])<0) { aikavertailu_vakiluku="vähentynyt"; }
	*/
	
	/*" henkilöä, joista "+luvut_1[1]+" ("+Math.round(luvut_1[1]/luvut_1[0]*100)+" %) oli alaikäisiä. Työikäisiä eli 18-64 -vuotiaita oli "+Math.round(luvut_1[2]/luvut_1[0]*100)+" prosenttia väestöstä ja eläikään	ehtineitä " 
		+ Math.round(luvut_1[3]/luvut_1[0]*100) +" prosenttia.";
	document.getElementById("kpl_2").innerHTML="Kunnan työllisyysaste oli "+Math.round(luvut_1[6]/luvut_1[2]*100)+" % ja työttömyysaste "	+Math.round(luvut_1[8]/(parseInt(luvut_1[4])+parseInt(luvut_1[8]))*100)+"%. Koko maan työttömyysaste oli "+tt_vertailu+":"+Math.round(luvut_3[8]/(parseInt(luvut_3[4])+parseInt(luvut_3[8]))*100)+"%";
	document.getElementById("kpl_3").innerHTML="Vuonna "+ekavuosi+" kunnassa oli "+luvut_2[0]+" henkilöä. Ajanjaksolla "+ekavuosi+"-"+vikavuosi+" kunnan väestö on siis "+aikavertailu_vakiluku+" "+(luvut_2[1]-luvut_2[0])+" ("+(Math.round(luvut_2[1]/luvut_2[0]*100)-100)+"%) henkilöllä";
	*/
	
}
