
google.load('visualization', '1', {packages: ['corechart', 'bar']});
google.setOnLoadCallback(drawMultSeries);

	
function piirra(kuvadata,otsakkeet,otsikko,kohde,tyyppi) {
	  
	  if (tyyppi=="P") { prosenttia='percent'; }
	  if (tyyppi=="N") { prosenttia=false; }
	  if (tyyppi=="100") {
		for (x=1;x<kuvadata.length;x++) {		vuosi_nolla=kuvadata[x][0];		for (i=0;i<kuvadata[0].length;i++) 
		{ 		kuvadata[x][i]=(kuvadata[x][i]/vuosi_nolla)*100;		} 		}
		prosenttia=false;
	  }
	   if (tyyppi=="0") {
		for (x=1;x<kuvadata.length;x++) {		
			vuosi_nolla=kuvadata[x][0];	
			for (i=0;i<kuvadata[0].length;i++) 	{ kuvadata[x][i]=(vuosi_nolla-kuvadata[x][i]);	} 
		}
		prosenttia=false;
	  }
	  
	  
	  if (tyyppi=="NP") { prosenttia=true; }
		var rivit = new Array();
		rivit.push(otsakkeet);
		
		if (kuvadata.length==4) {
		for (i=0;i<kuvadata[0].length;i++) { vuosi=kuvadata[0][i].toString(); 
		luku=parseInt(kuvadata[1][i]); luku2=parseInt(kuvadata[2][i]);	luku3=parseInt(kuvadata[3][i]);
        rivit.push([vuosi,luku,luku2,luku3]); 		}
	    }
		if (kuvadata.length==3) {
		for (i=0;i<kuvadata[0].length;i++) { vuosi=kuvadata[0][i].toString(); 
		luku=parseInt(kuvadata[1][i]); luku2=parseInt(kuvadata[2][i]);	
        rivit.push([vuosi,luku,luku2]); 		}
	    }
		if (kuvadata.length==2) {
		for (i=0;i<kuvadata[0].length;i++) { vuosi=kuvadata[0][i].toString(); 
		luku=parseInt(kuvadata[1][i]); 
        rivit.push([vuosi,luku]); 		}
	    }
	
		var data = google.visualization.arrayToDataTable(rivit);
	  
	  
      var options = {
        title: otsikko,
        chartArea: {width: '75%',height:'80%'},
        hAxis: {     title: 'Vuosi',   minValue: 0     },
        //vAxis: {     title: 'Ikäluokka'    },
		bar: { groupWidth: '25%' },
		height: 500,
		//width:'100%',
		isStacked:prosenttia
      };
	  if (tyyppi=="0") {  var chart =  new google.visualization.LineChart(document.getElementById(kohde)); 	 } 
	  else {    var chart = new google.visualization.ColumnChart(document.getElementById(kohde)); }
      chart.draw(data, options);
	
}
