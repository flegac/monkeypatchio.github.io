var map;
jQuery(document).ready(function(){

    map = new GMaps({
        div: '#map',
        lat: 43.5378893,
        lng: 1.5329330,
    });
    map.addMarker({
        lat: 43.5378893,
        lng: 1.5329330,
        title: 'Address',      
        infoWindow: {
            content: '<h5 class="title">MonkeyPatch</h5><p><span class="region">7 ter chemin du Tricou</span><br><span class="postal-code">31670</span><br><span class="country-name">France</span></p>'
        }
        
    });

});