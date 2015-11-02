<script type="text/javascript">
	$(document).ready(function() {
		/** Close accordion on init */
	    $('#accordion').on('show.bs.collapse', function () {
			$('#accordion .in').collapse('hide');
		});	

		/** Animate to current job */
    	$('#accordion').on('shown.bs.collapse', function (e) {
        	var offset = $('.panel-collapse.collapse.in').offset();
        	if(offset) {
	            $('html,body').animate({
                	scrollTop: offset.top-130
            	}, 200); 
        	}
    	}); 

	/** highlight jobs headers */
     $('#accordion .accordion-header').hover(function () {
            $(this).addClass('highlight');
        }, function () {
            $(this).removeClass('highlight');
        });

	});
</script>