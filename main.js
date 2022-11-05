  $( function() {
    let pb = $( "#progressbar_GRS_in" ).progressbar({
      value: 100
    });
	let pl = $("#progress_label_GRS_in");
	pl.text();
	
	$( "#progressbar_GRS_out" ).progressbar({
      value: 70
    });
	$( "#progressbar_GRP_in" ).progressbar({
      value: 50
    });
	$( "#progressbar_GRP_out" ).progressbar({
      value: 70
    });
		$( "#progressbar_to_House1" ).progressbar({
      value: 90
    });
		$( "#progressbar_to_House2" ).progressbar({
      value: 33
    });
	
  } );
  
