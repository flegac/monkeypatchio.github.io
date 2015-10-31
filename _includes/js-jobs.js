<script type="text/javascript">
	$(document).ready(function() {
	    $('#accordion').on('show.bs.collapse', function () {
			$('#accordion .in').collapse('hide');
		});	
		function toggleChevron(e) {
			$(e.target)
				.prev('.item-inner')
				.find('i.indicator')
				.toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
		}
		$('#accordion').on('hidden.bs.collapse', toggleChevron);
		$('#accordion').on('shown.bs.collapse', toggleChevron);


	$('#accordion').on('shown.bs.collapse', function (e) {
        var offset = $('.panel.panel-default > .panel-collapse.in').offset();
        if(offset) {
            $('html,body').animate({
                scrollTop: $('.panel-title a').offset().top -20
            }, 500); 
        }
    }); 

	});
</script>