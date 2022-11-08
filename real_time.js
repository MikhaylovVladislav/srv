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
	var MPaH1=0;
	var MPaH2=0;
	var choiceGRSIn=0;
	var choiceGRSOut=0;
	var choiceGRPIn=0;
	var choiceGRPOut=0;
	var choiceH1=0;
	var choiceH2=0;
	var randChoice=0;
	var bool=false;
	var slideMag=0;
	var slideGRS=0;
	var slideGRP=0;
	var kf=10;

	$("#progress_label_GRS_in").text("0 МПа");
	$("#progressbar_GRS_in").progressbar( "option", "value", 0);
	$("#progress_label_GRS_out").text("0 МПа");
	$("#progressbar_GRS_out").progressbar( "option", "value", 0);
	$("#progress_label_GRP_in").text("0 МПа");
	$("#progressbar_GRP_in").progressbar( "option", "value", 0);
	$("#progress_label_GRP_out").text("0 МПа");
	$("#progressbar_GRP_out").progressbar( "option", "value", 0);
	$("#progress_label_to_House1").text("0 МПа");
	$("#progressbar_to_House1").progressbar( "option", "value", 0);
	$("#progress_label_to_House2").text("0 МПа");
	$("#progressbar_to_House2").progressbar( "option", "value", 0);
	
	//$("#sliderMag").progressbar( "option", "value", 100);
	
	$('#start_srv').on('click', function(){ 
		//alert($("#sliderGRP").slider("value"));
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
		choiceH1=0;
		choiceH2=0;
		
		slideMag=$("#sliderMag").slider("value");
		slideGRP=$("#sliderGRP").slider("value");
		slideGRS=$("#sliderGRS").slider("value");
		for(var i=0;i<6;i++){
			randChoice=Math.round(Math.random()*kf);
			if(randChoice!==0){
				choiceGRSIn+=0.2;
				choiceGRSOut+=0.1;
				choiceGRPIn+=0.1;
				choiceGRPOut+=0.0005;
				choiceH1+=0.000495;
				choiceH2+=0.000494;
			}
		}
		MPaMag=(Math.random() * (MaxMag - (MinMag+choiceGRSIn)) + (MinMag+choiceGRSIn))/100 * slideMag ;
		
		if(MPaMag<MinMag){
			
		}
		MPaGRS=(Math.random() * (MaxGRS - (MinGRS+choiceGRSOut)) + (MinGRS+choiceGRSOut))/100 * slideGRS;
		MPaGRP=(Math.random() * (MaxGRP - (MinGRP+choiceGRPOut)) + (MinGRP+choiceGRPOut))/100 * slideGRP;;
		MPaH1=(Math.random() * (MaxGRP - (MinGRP+choiceH1)) + (MinGRP+choiceH1));
		MPaH2=(Math.random() * (MaxGRP - (MinGRP+choiceH2)) + (MinGRP+choiceH2));
		
		$("#progress_label_GRS_in").text(String(MPaMag.toFixed(2) + " МПа"));
		$("#progressbar_GRS_in").progressbar( "option", "value", ((MPaMag/MaxMag)*100) );
		
		$("#progress_label_GRS_out").text(String(MPaGRS.toFixed(2) + " МПа"));
		$("#progressbar_GRS_out").progressbar( "option", "value", ((MPaGRS/MaxGRS)*100) );
		
		
		$("#progress_label_GRP_in").text(String(MPaGRS.toFixed(2) + " МПа"));
		$("#progressbar_GRP_in").progressbar( "option", "value", ((MPaGRS/MaxGRS)*100) );
		
		$("#progress_label_GRP_out").text(String(MPaGRP.toFixed(4) + " МПа"));
		$("#progressbar_GRP_out").progressbar( "option", "value", ((MPaGRP/MaxGRP)*100) );
		
		$("#progress_label_to_House1").text(String(MPaH1.toFixed(4) + " МПа"));
		$("#progressbar_to_House1").progressbar( "option", "value", ((MPaH1/MaxGRP)*100) );
		
		$("#progress_label_to_House2").text(String(MPaH2.toFixed(4) + " МПа"));
		$("#progressbar_to_House2").progressbar( "option", "value", ((MPaH2/MaxGRP)*100) );
		
		if(bool==true){
			setTimeout(timer, 1000);
		}
	}

	
});