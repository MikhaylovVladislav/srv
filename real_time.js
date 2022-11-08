  $(document).ready(function(){
	var MaxMag=2.5;
	var MinMag=1.2;
	var MaxGRS=1.2;
	var MinGRS=0.6;
	var MaxGRP=0.003;
	var MinGRP=0.001;
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
	var isMagInLog=false;
	var isGRSInLog=false;
	var isGRPInLog=false;
	var isH1InLog=false;
	var isH2InLog=false;
	var isOnH1=1;
	var isOnH2=1;
	var isOnH=1;

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
	
	var time = setInterval(function() {
		var date = new Date();
		$("#date").text(date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear());
		$("#time").text(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
	}, 1000);
	
	$('.H').on('change', function(){ 
	if($("#checkbox-1").is(":checked")){
		isOnH1=1;
		$("#disk1").css('background-color','green');
		$("#disk1").css('border','4px solid green');
		$("#line_H2").css('border-top','6px solid green');
	}else{
		isOnH1=0;
		$("#disk1").css('background-color','red');
		$("#disk1").css('border','4px solid red');
		$("#line_H2").css('border-top','6px solid red');
		$("#textLog").html($("#textLog").text()+ "\n"+"Поступление газа к Д№1 отключено");
	}
	
	if($("#checkbox-2").is(":checked")){
		isOnH2=1;
		$("#disk2").css('background-color','green');
		$("#disk2").css('border','4px solid green');
		$("#line_H3").css('border-top','6px solid green');
	}else{
		isOnH2=0;
		$("#disk2").css('background-color','red');
		$("#disk2").css('border','4px solid red');
		$("#line_H3").css('border-top','6px solid red');
			$("#textLog").html($("#textLog").text()+ "\n"+"Поступление газа к Д№2 отключено");
	}
	});
	
	$('#start_srv').on('click', function(){ 
		bool=true;
		var time = setTimeout(timer, 1000);
	});
	$('#stop_srv').on('click', function(){ 
		bool=false;
	});
	function timer() {
		var dateN = new Date();
		var dateT=dateN.getHours() + ":" + dateN.getMinutes() + ":" + dateN.getSeconds()+" ";
		choiceGRSIn=0;
		choiceGRSOut=0;
		choiceGRPIn=0;
		choiceGRPOut=0;
		choiceH1=0;
		choiceH2=0;
		
		//$("#textLog").html("");
		
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
		if(MPaMag<MinMag ){
			slideGRS=0;
			if(isMagInLog==false){
			$("#textLog").html("\n"+dateT+ " Низкое давление в магистрале"+ $("#textLog").text());
			}
			isMagInLog=true;
			$("#line_M1").css('border-left','6px solid red');
		}else{
			isMagInLog=false;
			$("#line_M1").css('border-left','6px solid green');
		}
		MPaGRS=(Math.random() * (MaxGRS - (MinGRS+choiceGRSOut)) + (MinGRS+choiceGRSOut))/100 * slideGRS;
		if(MPaGRS<MinGRS ){
			slideGRP=0;
			if(isGRSInLog==false){
				$("#textLog").html( "\n"+dateT+"Низкое входное давление ГРС" + $("#textLog").text());
				$("#textLog").html( "\n"+dateT+"Низкое выходное давление ГРС" + $("#textLog").text());
			}
			isGRSInLog=true;
			$("#line_M2").css('border-left','6px solid red');

		}else{
			isGRSInLog=false;
			$("#line_M2").css('border-left','6px solid green');
		}
		
		MPaGRP=(Math.random() * (MaxGRP - (MinGRP+choiceGRPOut)) + (MinGRP+choiceGRPOut))/100 * slideGRP;
		if(MPaGRP<MinGRP ){
			isOnH=0;
			if(isGRPInLog==false){
			$("#textLog").html("\n"+dateT+"Низкое входное давление ГРП "+$("#textLog").text());
			$("#textLog").html("\n"+dateT+"Низкое выходное давление ГРП"+ $("#textLog").text());
			}
			isGRPInLog=true;
			if(isH1InLog==false){
			$("#textLog").html("\n"+dateT+"Поступление газа к Д№1 отсутствует"+ $("#textLog").text());
			}
			isH1InLog=true;
			
			if(isH2InLog==false){
			$("#textLog").html("\n"+dateT+"Поступление газа к Д№2 отсутствует"+ $("#textLog").text());
			}
			isH2InLog=true;
			$("#line_H0").css('border-top','6px solid red');
			$("#line_H1").css('border-top','6px solid red');
			$("#line_H2").css('border-top','6px solid red');
			$("#line_H3").css('border-top','6px solid red');
			$(".line_C").css('border-left','6px solid red');
		}else{
			isOnH=1;
			isGRPInLog=false;
			isH1InLog=false;
			isH2InLog=false;
			$("#line_H0").css('border-top','6px solid green');
			$("#line_H1").css('border-top','6px solid green');
			
			if(isOnH1==1){
				$("#line_H2").css('border-top','6px solid green');
			}
			if(isOnH2==1){
				$("#line_H3").css('border-top','6px solid green');
			}
			$(".line_C").css('border-left','6px solid green');
		}
		MPaH1=(Math.random() * (MaxGRP - (MinGRP+choiceH1)) + (MinGRP+choiceH1))/100 * slideGRP*isOnH1*isOnH ;
		MPaH2=(Math.random() * (MaxGRP - (MinGRP+choiceH2)) + (MinGRP+choiceH2))/100 * slideGRP*isOnH2*isOnH;	
		
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