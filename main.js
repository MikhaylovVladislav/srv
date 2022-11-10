  $( function() {
    $( "#progressbar_GRS_in" ).progressbar({
		value: 100
    });
	$("#progress_label_GRS_in");
	
	$( "#progressbar_GRS_out" ).progressbar({
		value: 70
    });
	$("#progress_label_GRS_out");
	 
	$( "#progressbar_GRP_in" ).progressbar({
      value: 50
    });
	$("#progress_label_GRP_in");
	 
	$( "#progressbar_GRP_out" ).progressbar({
		value: 70
    });
	$("#progress_label_GRP_out");
	 
	$( "#progressbar_to_House1" ).progressbar({
		value: 90
    });
	$("#progress_label_to_House1");
	 
	$( "#progressbar_to_House2" ).progressbar({
		value: 33
    });
	$("#progress_label_to_House2");
	 

	var handleMag = $( "#custom-handleMag" );
	var handleGRS = $( "#custom-handleGRS" );
	var handleGRP = $( "#custom-handleGRP" );
	$( "#sliderMag" ).slider({
		orientation: "horizontal",
		range: "min",
		max: 100,
		value: 100,
		
		create: function() {
        handleMag.text( $( this ).slider( "value" ) );
      },
      slide: function( event, ui ) {
        handleMag.text( ui.value );
      }
    });
	
	$( "#sliderGRS" ).slider({
		orientation: "horizontal",
		range: "min",
		max: 100,
		value: 100,
		
		create: function() {
        handleGRS.text( $( this ).slider( "value" ) );
      },
      slide: function( event, ui ) {
        handleGRS.text( ui.value );
      }
    });
	
	$( "#sliderGRP" ).slider({
		orientation: "horizontal",
		range: "min",
		max: 100,
		value: 100,
		
		create: function() {
        handleGRP.text( $( this ).slider( "value" ) );
      },
      slide: function( event, ui ) {
        handleGRP.text( ui.value );
      }
    });
	
	$( "input" ).checkboxradio();
	$( "#seson" ).selectmenu();
	
  } );
	
	
  
