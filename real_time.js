  $(document).ready(function(){
	var MaxMag=2.5;
	var MinMag=1.2;
	var MaxGRS=1.2;
	var MinGRS=0.6;
	var MaxGRP=0.003;
	var MinGRP=0;
	var MPaMag=0;
	var MPaGRS=0;
	var MPaGRP=0;
	var choiceGRSIn=0;
	var choiceGRSOut=0;
	var choiceGRPIn=0;
	var choiceGRPOut=0;
	var randChoice=0;
	var t="sos";
	var bool=false;

	$("#progress_label_GRS_in").text("0 МПа");
	$("#progressbar_GRS_in").progressbar( "option", "value", 0);
	$("#progress_label_GRS_out").text("0 МПа");
	$("#progressbar_GRS_out").progressbar( "option", "value", 0);
	$("#progress_label_GRP_in").text("0 МПа");
	$("#progressbar_GRP_in").progressbar( "option", "value", 0);
	$("#progress_label_GRP_out").text("0 МПа");
	$("#progressbar_GRP_out").progressbar( "option", "value", 0);
	
	$('#start_srv').on('click', function(){ 
		bool=true;
		var time = setTimeout(timer, 1000);
	});
	$('#stop_srv').on('click', function(){ 
		bool=false;
	});
	function timer() {
		choiceGRSIn=0;
		choiceGRSOut=0;
		choiceGRPIn=0;
		choiceGRPOut=0;
		for(var i=0;i<5;i++){
			randChoice=Math.round(Math.random()*10);
			if(randChoice!==0){
				choiceGRSIn+=0.2;
				choiceGRSOut+=0.1;
				choiceGRPIn+=0.1;
				choiceGRPOut+=0.0005;
			}
		}
		MPaMag=(Math.random() * (MaxMag - (MinMag+choiceGRSIn)) + (MinMag+choiceGRSIn));
		MPaGRS=(Math.random() * (MaxGRS - (MinGRS+choiceGRSOut)) + (MinGRS+choiceGRSOut));
		MPaGRP=(Math.random() * (MaxGRP - (MinGRP+choiceGRPOut)) + (MinGRP+choiceGRPOut));
		
		$("#progress_label_GRS_in").text(String(MPaMag.toFixed(2) + " МПа"));
		$("#progressbar_GRS_in").progressbar( "option", "value", ((MPaMag/MaxMag)*100) );
		
		$("#progress_label_GRS_out").text(String(MPaGRS.toFixed(2) + " МПа"));
		$("#progressbar_GRS_out").progressbar( "option", "value", ((MPaGRS/MaxGRS)*100) );
		
		
		$("#progress_label_GRP_in").text(String(MPaGRS.toFixed(2) + " МПа"));
		$("#progressbar_GRP_in").progressbar( "option", "value", ((MPaGRS/MaxGRS)*100) );
		
		$("#progress_label_GRP_out").text(String(MPaGRP.toFixed(4) + " МПа"));
		$("#progressbar_GRP_out").progressbar( "option", "value", ((MPaGRP/MaxGRP)*100) );
		if(bool==true){
			setTimeout(timer, 1000);
		}
	}

	
});