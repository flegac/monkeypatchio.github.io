<script type="text/javascript">
	$(document).ready(function() {
		/** Close accordion on init */
	    $('#accordion').on('show.bs.collapse', function () {
			$('#accordion .in').collapse('hide');
		});	

		/** Animate to current job */
    	$('#accordion').on('shown.bs.collapse', function (e) {
        	var offset = $('.panel.panel-default > .panel-collapse.in').offset();
        	if(offset) {
	            $('html,body').animate({
                	scrollTop: $('.panel-title a').offset().top -20
            	}, 500); 
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