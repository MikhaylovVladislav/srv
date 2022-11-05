  $(document).ready(function(){
	var MaxMag=2.5;
	var MinMag=1.2;
	var MaxGRS=1.2;
	var MinGRS=0.6;
	var MaxGRP=0.003;
	var MinGRP=0;
	var MPa=0;
	var t="sos";
	var bool=false;

	$("#progress_label_GRS_in").text("11");
	$("#progressbar_GRS_in").progressbar( "option", "value", 25 );
	
	$('#start_srv').on('click', function(){ 
		bool=true;
		var time = setTimeout(timer, 1000);
	});
	$('#stop_srv').on('click', function(){ 
		bool=false;
	});
	function timer() {
		MPa=(Math.random() * (MaxMag - MinMag) + MinMag);
		$("#progress_label_GRS_in").text(String(MPa.toFixed(2)));
	$("#progressbar_GRS_in").progressbar( "option", "value", ((MPa/MaxMag)*100) );
		if(bool==true){
			setTimeout(timer, 1000);
		}
	}

	
});