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
	var	MPaGRPIn=0
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
	var gasOnH1=0;
	var gasOnH2=0;
	var profitGasOnH1=0;
	var profitGasOnH2=0;
	var tarif=1;
	var gasOnSecH1=0;
	var gasOnSecH2=0;
	var isModeBreak=false;
	var isBreakM1=false; 
	var isBreakM2=false; 
	var isBreakC=false; 
	var isBreakH0=false; 
	var isBreakH1=false; 
	var isBreakH2=false; 
	var isBreakH3=false; 
	var gr="6px solid green";
	var ye="6px solid gold";
	var re="6px solid red";
	var toggle=true;
	var IOH=1;
	var IOH1=1;
	var IOH2=1;
	var IOH1In=1;
	var IOH2In=1;
	var colorH1="";
	var colorH2="";

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
	
	
	$( "#seson" ).on( "selectmenuselect", function() {
		if($("#1").is(":selected")){
			tarif=1.28;
		}else if($("#2").is(":selected")){
			tarif=1.05;
		}else if($("#3").is(":selected")){
			tarif=0.70;
		}else if($("#4").is(":selected")){
			tarif=1.01;
		}
	} );
	
	var time = setInterval(function() {
		var date = new Date();
		$("#date").text(date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear());
		$("#time").text(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
	}, 1000);
	
	
	$('#checkbox-1').on('change', function(){ 
		var dateZ = new Date();
		var dateZ=dateZ.getHours() + ":" + dateZ.getMinutes() + ":" + dateZ.getSeconds()+" ";
		if($("#checkbox-1").is(":checked")){
			$("#textLog").html("\n"+dateZ+"Поступление газа к Д№1 включено" + $("#textLog").text());
		}else{
			$("#textLog").html("\n"+dateZ+"Поступление газа к Д№1 отключено" + $("#textLog").text());
		}
		});
		
		$('#checkbox-2').on('change', function(){ 
			var dateZ = new Date();
			var dateZ=dateZ.getHours() + ":" + dateZ.getMinutes() + ":" + dateZ.getSeconds()+" ";
			if($("#checkbox-2").is(":checked")){
				$("#textLog").html("\n"+dateZ+"Поступление газа к Д№2 включено" + $("#textLog").text());
			}else{
				$("#textLog").html("\n"+dateZ+"Поступление газа к Д№2 отключено" + $("#textLog").text());
			}
		});
	
		$('.H').on('change', function(){ 
			if($("#checkbox-1").is(":checked")){
				isOnH1=1;
				$("#disk1").css('background-color','green');
				$("#disk1").css('border','4px solid green');
				colorH1="6px solid green";
				//$("#line_H2").css('border-top','6px solid green');
			}else{
				isOnH1=0;
				$("#disk1").css('background-color','red');
				$("#disk1").css('border','4px solid red');
				colorH1="6px solid red";
				//$("#line_H2").css('border-top','6px solid red');
			}
	
			if($("#checkbox-2").is(":checked")){
				var dateZ = new Date();
				var dateZ=dateZ.getHours() + ":" + dateZ.getMinutes() + ":" + dateZ.getSeconds()+" ";
				isOnH2=1;
				$("#disk2").css('background-color','green');
				$("#disk2").css('border','4px solid green');
				colorH2="6px solid green";
				//$("#line_H3").css('border-top','6px solid green');
				$("#textLog").html("\n"+dateZ+"Поступление газа к Д№2 включено" + $("#textLog").text());
			}else{
				var dateZ = new Date();
				var dateZ=dateZ.getHours() + ":" + dateZ.getMinutes() + ":" + dateZ.getSeconds()+" ";
				isOnH2=0;
				$("#disk2").css('background-color','red');
				$("#disk2").css('border','4px solid red');
				colorH2="6px solid red";
				//$("#line_H3").css('border-top','6px solid red');
				$("#textLog").html("\n"+dateZ+"Поступление газа к Д№2 отключено"+ $("#textLog").text());
			}
			});
	
	$('#start_srv').on('click', function(){ 
		bool=true;
		var time = setTimeout(timer, 1000);
	});
	
	$('#stop_srv').on('click', function(){ 
		bool=false;
	});
	
	$('#break_srv').on('click', function(){ 
		isModeBreak=true;
		$("#fieldS").css("border-color", "red");
		$("#mainLegend").html("Система реального времени [РЕЖИМ АВАРИЙ]");
		
	});
	
	$('#outBreak_srv').on('click', function(){ 
		isModeBreak=false;
		$("#fieldS").css("border-color", "gray");
		$("#mainLegend").html("Система реального времени");
		
	});
	
	
	$('#line_M1').on('click', function(){ 
		if(isModeBreak==true){
			isBreakM1=true;
			var dateZ = new Date();
			var dateZ=dateZ.getHours() + ":" + dateZ.getMinutes() + ":" + dateZ.getSeconds()+" ";
			$("#textLog").html( "\n"+dateZ+"Авария на магистральном трубопроводе" + $("#textLog").text());
			$('#line_M1').css("border-left", ye);	
		}
	});
	
	$('#line_M2').on('click', function(){ 
		if(isModeBreak==true){
			isBreakM2=true;
			var dateZ = new Date();
			var dateZ=dateZ.getHours() + ":" + dateZ.getMinutes() + ":" + dateZ.getSeconds()+" ";
			$("#textLog").html( "\n"+dateZ+"Авария на распределительном трубопроводе" + $("#textLog").text());
			$('#line_M2').css("border-left", ye);	
		}
	});
	
	$('#line_H3').on('click', function(){ 
		if(isModeBreak==true){
			isBreakH3=true;
			var dateZ = new Date();
			var dateZ=dateZ.getHours() + ":" + dateZ.getMinutes() + ":" + dateZ.getSeconds()+" ";
			$("#textLog").html( "\n"+dateZ+"Авария на вводном трубопроводе" + $("#textLog").text());
			$('#line_H3').css("border-top", "6px solid gold");	
		}
	});
	
	$('#line_H1').on('click', function(){ 
		if(isModeBreak==true){
			isBreakH1=true;
			var dateZ = new Date();
			var dateZ=dateZ.getHours() + ":" + dateZ.getMinutes() + ":" + dateZ.getSeconds()+" ";
			$("#textLog").html( "\n"+dateZ+"Авария на газопровод-вводном трубопроводе" + $("#textLog").text());
			$('#line_H1').css("border-top", "6px solid gold");	
		}
	});
	
	$('#line_H0').on('click', function(){ 
		if(isModeBreak==true){
			isBreakH0=true;
			var dateZ = new Date();
			var dateZ=dateZ.getHours() + ":" + dateZ.getMinutes() + ":" + dateZ.getSeconds()+" ";
			$("#textLog").html( "\n"+dateZ+"Авария на газопровод-вводном трубопроводе" + $("#textLog").text());
			$('#line_H0').css("border-top", "6px solid gold");	
		}
	});
	
	$('#line_H2').on('click', function(){ 
		if(isModeBreak==true){
			isBreakH2=true;
			var dateZ = new Date();
			var dateZ=dateZ.getHours() + ":" + dateZ.getMinutes() + ":" + dateZ.getSeconds()+" ";
			$("#textLog").html( "\n"+dateZ+"Авария на вводном трубопроводе" + $("#textLog").text());
			$('#line_H2').css("border-top", "6px solid gold");	
		}
	});
	
	$('#line_C1').on('click', function(){ 
		if(isModeBreak==true){
			isBreakC=true;
			$('#line_C1').css("border-left", "6px solid gold");	
			$('#line_C2').css("border-left", "6px solid gold");	
		}
	});
	$('#line_C2').on('click', function(){ 
		if(isModeBreak==true){
			isBreakC=true;
			$("#textLog").html( "\n"+dateZ+"Авария на регулирующем трубопроводе" + $("#textLog").text());
			$('#line_C1').css("border-left", "6px solid gold");	
			$('#line_C2').css("border-left", "6px solid gold");	
		}
	});
	
	$('#brig_srv').on('click', function(){ 
		var dateZ = new Date();
		var dateZ=dateZ.getHours() + ":" + dateZ.getMinutes() + ":" + dateZ.getSeconds()+" ";
		$("#textLog").html( "\n"+dateZ+"Отправлена заявка на ликвидацию аварии" + $("#textLog").text());
		var time = setTimeout(function() {
			
			isBreakM1=false; 
			isBreakM2=false; 
			isBreakC=false; 
			isBreakH0=false; 
			isBreakH1=false; 
			isBreakH2=false; 
			isBreakH3=false;
			IOH1In=1;
			IOH2In=1;
		
			$("#textLog").html( "\n"+dateZ+"Авария ликвидирована" + $("#textLog").text());
			$('#line_C1').css("border-left", "6px solid green");	
			$('#line_C2').css("border-left", "6px solid green");	
			$('#line_H0').css("border-top", "6px solid green");	
			$('#line_H1').css("border-top", "6px solid green");	
			$('#line_H2').css("border-top", "6px solid green");	
			$('#line_H3').css("border-top", "6px solid green");	
			$('#line_M1').css("border-left", "6px solid green");	
			$('#line_M2').css("border-left", "6px solid green");	
	}, 5000);
		
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
		
		slideMag=$("#sliderMag").slider("value");
		slideGRP=$("#sliderGRP").slider("value");
		slideGRS=$("#sliderGRS").slider("value");
		isBreakH2 == true ? IOH1In=0:IOH1In=1;
		isBreakH3 == true ? IOH2In=0:IOH2In=1;
		
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
		isBreakM1==true ? slideMag=0:slideMag=slideMag;
		MPaMag=(Math.random() * (MaxMag - (MinMag+choiceGRSIn)) + (MinMag+choiceGRSIn))/100 * slideMag ;
		
		if(MPaMag<MinMag ){
			slideGRS=0;
			if(isMagInLog==false){
			$("#textLog").html("\n"+dateT+ " Низкое давление в магистрале"+ $("#textLog").text());
			}
			isMagInLog=true;
			
			isBreakM1 == true && toggle ==true  ? $("#line_M1").css('border-left',ye) : $("#line_M1").css('border-left',re);
			toggle=!toggle;
		}else{
			isBreakM1 == true && toggle ==true  ? $("#line_M1").css('border-left',ye) : $("#line_M1").css('border-left',gr);
			toggle=!toggle;
			isMagInLog=false;
			
		}
		if(isBreakM2==true){
			MPaGRPIn=(Math.random() * (MaxGRS - (MinGRS+choiceGRSOut)) + (MinGRS+choiceGRSOut))/100 * 0;
			slideGRP=0;
		}else{
			MPaGRPIn=(Math.random() * (MaxGRS - (MinGRS+choiceGRSOut)) + (MinGRS+choiceGRSOut))/100 * slideGRS;
		}
		MPaGRS=(Math.random() * (MaxGRS - (MinGRS+choiceGRSOut)) + (MinGRS+choiceGRSOut))/100 * slideGRS;
		
		if(MPaGRS<MinGRS ){
			slideGRP=0;
			if(isGRSInLog==false){
				$("#textLog").html( "\n"+dateT+"Низкое входное давление ГРС" + $("#textLog").text());
				$("#textLog").html( "\n"+dateT+"Низкое выходное давление ГРС" + $("#textLog").text());
			}
			isGRSInLog=true;
			isBreakM2 == true && toggle ==true  ? $("#line_M2").css('border-left',ye) : $("#line_M2").css('border-left',re);

		}else{
			isGRSInLog=false;
			isBreakM2 == true && toggle ==true  ? $("#line_M2").css('border-left',ye) : $("#line_M2").css('border-left',gr);
			
		}
		
		MPaGRP=(Math.random() * (MPaGRP - (MinGRP+choiceGRPOut)) + (MinGRP+choiceGRPOut))/100 * slideGRP;
		
		
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
			isBreakH0 == true && toggle ==true  ? $("#line_H0").css('border-top',ye) : $("#line_H0").css('border-top',re);
			isBreakH1 == true && toggle ==true  ? $("#line_H1").css('border-top',ye) : $("#line_H1").css('border-top',re);
			isBreakH2 == true && toggle ==true  ? $("#line_H2").css('border-top',ye) : $("#line_H2").css('border-top',re);
			isBreakH3 == true && toggle ==true  ? $("#line_H3").css('border-top',ye) : $("#line_H3").css('border-top',re);
			isBreakC == true && toggle ==true  ? $(".line_C").css('border-left',ye) : $(".line_C").css('border-left',re);

		}else{
			isOnH=1;
			isGRPInLog=false;
			isH1InLog=false;
			isH2InLog=false;
			isBreakH0 == true && toggle ==true  ? $("#line_H0").css('border-top',ye) : $("#line_H0").css('border-top',gr);
			isBreakH1 == true && toggle ==true  ? $("#line_H1").css('border-top',ye) : $("#line_H1").css('border-top',gr);
			if(isOnH1==0){
				isBreakH2 == true && toggle ==true  ? $("#line_H2").css('border-top',ye) : $("#line_H2").css('border-top',colorH1);
			}
			
			if(isOnH2==0){
				isBreakH3 == true && toggle ==true  ? $("#line_H3").css('border-top',ye) : $("#line_H3").css('border-top',colorH2);
			}
			if(isOnH1==1){
				isBreakH2 == true && toggle ==true  ? $("#line_H2").css('border-top',ye) : $("#line_H2").css('border-top',colorH1);
			}
			if(isOnH2==1){
				isBreakH3 == true && toggle ==true  ? $("#line_H3").css('border-top',ye) : $("#line_H3").css('border-top',colorH2);
			}
			isBreakC == true && toggle ==true  ? $(".line_C").css('border-left',ye) : $(".line_C").css('border-left',gr);
		}
		
		isBreakC==true ? IOH=0:IOH=1;
		isBreakH0==true ? IOH1=0:IOH1=1;
		isBreakH1==true ? IOH2=0:IOH2=1;
		
		MPaH1=(Math.random() * (MaxGRP - (MinGRP+choiceH1)) + (MinGRP+choiceH1))/100 * slideGRP*isOnH1*isOnH*IOH*IOH1;
		MPaH2=(Math.random() * (MaxGRP - (MinGRP+choiceH2)) + (MinGRP+choiceH2))/100 * slideGRP*isOnH2*isOnH*IOH*IOH2;	
		
		$("#progress_label_GRS_in").text(String(MPaMag.toFixed(2) + " МПа"));
		$("#progressbar_GRS_in").progressbar( "option", "value", ((MPaMag/MaxMag)*100) );
		
		$("#progress_label_GRS_out").text(String(MPaGRS.toFixed(2) + " МПа"));
		$("#progressbar_GRS_out").progressbar( "option", "value", ((MPaGRS/MaxGRS)*100) );
		
		
		$("#progress_label_GRP_in").text(String(MPaGRPIn.toFixed(2) + " МПа"));
		$("#progressbar_GRP_in").progressbar( "option", "value", ((MPaGRPIn/MaxGRS)*100) );
		
		$("#progress_label_GRP_out").text(String(MPaGRP.toFixed(4) + " МПа"));
		$("#progressbar_GRP_out").progressbar( "option", "value", ((MPaGRP/MaxGRP)*100) );
		
		$("#progress_label_to_House1").text(String(MPaH1.toFixed(4) + " МПа"));
		$("#progressbar_to_House1").progressbar( "option", "value", ((MPaH1/MaxGRP)*100) );
		
		$("#progress_label_to_House2").text(String(MPaH2.toFixed(4) + " МПа"));
		$("#progressbar_to_House2").progressbar( "option", "value", ((MPaH2/MaxGRP)*100) );
		
		if(isOnH1*isOnH*IOH*IOH1*IOH1In==0){
		}else{
			gasOnH1=tarif*4.12/360;
			gasOnSecH1+=gasOnH1;
			$("#cg_H1").text(String(gasOnSecH1.toFixed(2)) + " куб.м");
			profitGasOnH1+=gasOnH1*5.617;
			$("#profit_H1").text("Доход: " + String(profitGasOnH1.toFixed(4)) + " руб.");
		}
		if(isOnH2*isOnH*IOH*IOH2*IOH2In==0){
		}else{
			gasOnH2=tarif*8.16/360;
			gasOnSecH2+=gasOnH2;
			$("#cg_H2").text(String(gasOnSecH2.toFixed(2)) + " куб.м");
			profitGasOnH2+=gasOnH2*5.617;
			$("#profit_H2").text("Доход: " + String(profitGasOnH2.toFixed(4)) + " руб.");
		}
		if(bool==true){
			setTimeout(timer, 1000);
		}
	}
	

	
});